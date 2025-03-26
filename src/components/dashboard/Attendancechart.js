import React, { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

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
                console.log(roomMembers);
                console.log(`${backendurl}/attendance/get_room_attendance`);

                // 出勤情報を取得
                const response = await axios.post(`${backendurl}/attendance/get_room_attendance`, {
                    roomname: roomname
                });
                const allAttendance = response.data.attendance;
                console.log(allAttendance);

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

    if (switchview) {
        return (
            <div className="container mt-1">
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="card shadow p-3">
                    <h4 className="text-center">週間滞在時間（秒単位）</h4>
                    <div style={{ overflowX: "auto" }}>
                        <BarChart
                            width={Math.max(500, weeklydata.length * 80)} // ユーザー数に応じて横幅を動的に
                            height={250}
                            data={weeklydata}
                            margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                        >
                            <XAxis 
                                dataKey="user_id"
                                label={{ value: "User Name", position: "insideBottom", dy: 30 }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis 
                                label={{ value: "Seconds", angle: -90, position: "insideLeft", offset: -10 }} 
                                domain={[0, "dataMax + 1"]}
                            />
                            <Tooltip />
                            <Bar dataKey="total_time" fill="#007bff" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    } else {
        return (
            <div className="container mt-1">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow p-3">
                            <h4 className="text-center">{username} の在室時間推移（秒単位）</h4>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={historyData} margin={{ top: 10, right: 30, left: 40, bottom: 20 }}>
                                        <XAxis 
                                            dataKey="week_start" 
                                            label={{ value: "Week Start", position: "insideBottom", dy: 15 }} 
                                            padding={{ left: 20, right: 20 }} 
                                        />
                                        <YAxis 
                                            label={{ value: "Seconds", angle: -90, position: "insideLeft", offset: -10 }} 
                                            domain={[0, "dataMax + 1"]} 
                                        />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="total_time" stroke="#007bff" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Attendancechart;
