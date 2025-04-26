import React from "react";
import Equipmentviewswitch from "./Equipmentviewswitch";
import "./css/Equipmentlistcontent.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Totalcost from "./Totalcost";
import Remainingmoney from "./Remainingmoney";

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

// 研究室備品を表示するページのビュー
const Equipmentview = ({ user_id, baseurl, monthpay }) => {
    const [switchview, setswitchview] = useState(true);
    const [recieveallmoney, setRecieveallmoney] = useState(0);
    const [totalcost, setTotalcost] = useState(null);
    const [remaining, setremaining] = useState(0);
    const [usercurrentpay, setUsercurrentpay] = useState(0); // userの現在の支払い金額
    const roomname = localStorage.getItem("T-Lab_roomname");
    const userid = localStorage.getItem("T-lab_userid");

    useEffect(() => {
        // room内のユーザーの情報を全て取得
        const getCurrentUserData = async () => {
            try {
                const response = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
                const users = response.data;
                let tempRecieveallmoney = recieveallmoney;
                for (const user of users) {
                    // 会計受け取り金額を計算
                    tempRecieveallmoney += user.current_pay;
                    if (user.id === Number(userid)){ //もし自分のデータだった場合
                        // 現在の支払い金額を取得
                        setUsercurrentpay(user.current_pay);
                    }
                }
                setRecieveallmoney(tempRecieveallmoney);
            } catch (error) {
                console.error("Error fetching room members:", error);
            }
        };
        if (roomname) {
            getCurrentUserData();
        }
        }, []);

    useEffect(() => {
        const calctotal = async () => {
            try {
                const equipments = await axios.get(`${baseurl}/equipment/get_allequipment/${roomname}`);
                const equipmenthistories = await axios.get(`${baseurl}/equipment/history/get_allequipment/${roomname}`);

                // equipmentの金額を取得
                const equipmentPrices = equipments.data.map(item => item.price);
                // equipmenthistoryの金額を取得
                const equipmentHistoryPrices = equipmenthistories.data.map(item => item.price);
                
                // 合計金額を計算
                const totalCost = [...equipmentPrices, ...equipmentHistoryPrices].reduce((a, b) => a + b, 0);
                setTotalcost(totalCost);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        calctotal();
    }, []);

    const remainingcalc = () => {
        setremaining(recieveallmoney - totalcost);
    }
    useEffect(() => {
        remainingcalc();
    }, [totalcost, recieveallmoney]);

    const toggleswitchview = () => {
        if (switchview === true) {
            setswitchview(false);
        } else {
            setswitchview(true);
        }
    };

    return (
        <>
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">LABLINK</h1>
                </div>

                {/* <!-- Content Row --> */}
                <div className="row">
                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <Totalcost baseurl={baseurl} setTotalcost={setTotalcost} totalcost={totalcost} />
                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1 font-japanese">
                                            会計受け取り金額</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">￥{recieveallmoney}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 font-japanese">
                                            支払い済み</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">￥{usercurrentpay}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Pending Requests Card Example --> */}
                    <Remainingmoney remaining={remaining} />
                </div>

                {/* <!-- Content Row --> */}

                <div className="row">

                    {/* <!-- Area Chart --> */}
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary font-japanese mr-1">研究室内備品リスト</h6>
                                <button type="button" className="btn btn-primary font-japanese" onClick={toggleswitchview}>switch</button>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <div className="chart-area scroll">
                                    <Equipmentviewswitch switchview={switchview} user_id={user_id} baseurl={baseurl} setswitchview={setswitchview} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Equipmentview;
