// ホーム画面の内容の定義
import React from "react";
import './../css/sb-admin-2.css';
import './../css/sb-admin-2.min.css';
import './../vendor/fontawesome-free/css/all.min.css';
import './../css/Dashboardview.css';
import Members from './Members.js';
import { useState } from "react";
import Informationswitch from './Informationswitch.js'
import "./../Equipments/Equipmentlistcontent.css";
import { useNavigate } from "react-router-dom";

const Dashboardview = ({ user_id, baseurl }) => {
    // 掲示板内の表示を切り替えるスイッチの状態を管理する変数
    const [switchview, setswitchview] = useState(true);
    // ルーティング用のフック
    const navigate = useNavigate();
    // 掲示板内の表示を切り替える関数
    const toggleswitchview = () => {
        if (switchview === true) {
            setswitchview(false);
        } else {
            setswitchview(true);
        }
    };
    // 研究室の在室状況を切り替える関数
    const switchatoffice = () => {
        navigate('/atofficechange')
    }
    return (
        <>
            <div className="container-fluid">

                {/* ページのヘッダー */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">LABLINK</h1>
                </div>

                {/* 在室を切り替えるスイッチ */}
                <div className="row">
                    <div className="card-body">
                        <a className="btn btn-primary btn-icon-split" onClick={switchatoffice}>
                            <span className="text">status switch</span>
                        </a>
                    </div>

                    {/* 研究室内のメンバーのリスト表示部分 */}
                    <div className="col-lg-6 mb-4">
                        <Members baseurl={baseurl} />
                    </div>

                    <div className="col-lg-6 mb-4">
                        {/* 掲示板の表示部分 */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary font-japanese">BBS</h6>
                                <div className="text-right">
                                    <button type="button" className="btn btn-primary font-japanese" onClick={toggleswitchview}>switch</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="chart-area scroll">
                                    <Informationswitch switchview={switchview} setswitchview={setswitchview} user_id={user_id} baseurl={baseurl} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboardview;
