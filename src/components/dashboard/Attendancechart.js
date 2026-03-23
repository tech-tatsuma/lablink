import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

ChartJS.register(
    CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend
);

const Attendancechart = ({ backendurl, switchview, setSwitchview }) => {
    const [weeklydata, setWeeklyData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const roomname = localStorage.getItem("T-Lab_roomname");
    const username = localStorage.getItem("T-lab_username");

    // 日本時間 (JST) の日付を取得する関数
    const getCurrentJSTDate = () => {
        const now = new Date();
        return new Date(now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
    };

    // JST 日付を受け取り、その週の月曜日を返す
    const getMondayOfCurrentWeek = (date) => {
        const dayOfWeek = date.getDay();
        const diff = (dayOfWeek === 0) ? -6 : (dayOfWeek === 1) ? 0 : 1 - dayOfWeek;
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);
        monday.setHours(0, 0, 0, 0);
        return monday;
    };

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                // 部屋内の全てのユーザーのデータを取得
                const res = await axios.get(`${backendurl}/user/room_members_from_roomname/${roomname}`);
                const roomMembers = res.data;  // 例: [{id: 1, name: 'test1', ...}, {id: 2, name: 'test2', ...}]

                // 出勤情報を取得
                const response = await axios.post(`${backendurl}/attendance/get_room_attendance`, {
                    roomname: roomname
                });
                const allAttendance = response.data.attendance;

                const today = getCurrentJSTDate();
                const weekStart = getMondayOfCurrentWeek(today);
                const weekStartStr = formatDateToYYYYMMDD(weekStart);

                // roomMembers を元に、今週の出勤情報を作成
                const filteredData = roomMembers.map(user => {
                    // ユーザー名で出勤情報を取得、なければ空の配列
                    const records = allAttendance[user.name] || [];
                    const currentWeekRecord = records.find(record => record.week_start === weekStartStr);
                    return {
                        user_id: user.name,  // ユーザーの名前をキーにする
                        total_time: currentWeekRecord ? currentWeekRecord.total_time : 0
                    };
                });

                setWeeklyData(filteredData);

                // 現在のユーザーの過去の履歴データを取得
                if (allAttendance[username]) {
                    const userHistory = allAttendance[username]
                        .map(record => ({
                            week_start: record.week_start,
                            total_time: record.total_time
                        }))
                        .sort((a, b) => new Date(a.week_start) - new Date(b.week_start));

                    setHistoryData(userHistory);
                }

            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();
    }, [backendurl, switchview, roomname, username]);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const weeklyChartData = useMemo(() => ({
        labels: weeklydata.map(item => item.user_id),
        datasets: [
            {
                label: "週間滞在時間",
                data: weeklydata.map(item => item.total_time),
                backgroundColor: "rgba(0, 123, 255, 0.8)",
                borderRadius: 6,
                maxBarThickness: 48
            }
        ]
    }), [weeklydata]);

    const historyChartData = useMemo(() => ({
        labels: historyData.map(item => item.week_start),
        datasets: [
            {
                label: "在室時間推移",
                data: historyData.map(item => item.total_time),
                borderColor: "rgba(0, 123, 255, 1)",
                backgroundColor: "rgba(0, 123, 255, 0.15)",
                tension: 0.3,
                fill: false,
                pointRadius: isMobile ? 2 : 3,
                pointHoverRadius: isMobile ? 4 : 5
            }
        ]
    }), [historyData, isMobile]);

    const commonOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        layout: {
            padding: {
                top: 8,
                right: 8,
                bottom: 8,
                left: 8
            }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: isMobile ? 90 : 45,
                    minRotation: isMobile ? 45 : 0,
                    font: {
                        size: isMobile ? 10 : 12
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: isMobile ? 10 : 12
                    }
                },
                title: {
                    display: true,
                    text: "Seconds",
                    font: {
                        size: isMobile ? 10 : 12
                    }
                }
            }
        }
    }), [isMobile]);
    if (switchview) {
        return (
            <div className="attendance-chart-panel">
                <h4 className="text-center attendance-chart-title">週間滞在時間</h4>
                <div className="attendance-chart-wrapper">
                    <Bar
                        data={weeklyChartData}
                        options={commonOptions}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="attendance-chart-panel">
                <h4 className="text-center attendance-chart-title">{username} の在室時間推移</h4>
                <div className="attendance-chart-wrapper">
                    <Line
                        data={historyChartData}
                        options={commonOptions}
                    />
                </div>
            </div>
        );
    }
};

export default Attendancechart;
