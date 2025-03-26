import React from 'react';
import './../../css/sb-admin-2.css';
import './../../css/sb-admin-2.min.css';
import './../../vendor/fontawesome-free/css/all.min.css';
import './css/Dashboardview.css'; //　ダッシュボード固有のCSSをインポート
import './../../css/App.css';
import { useState, useEffect } from 'react';
import Navigate from './../nav/Navigate'; // ナビゲーションバーのコンポーネントをインポート
import Tab from './Tab'; // タブのコンポーネントをインポート
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from './Content';

// ダッシュボードのルートコンポーネント
const Root = ({ baseurl }) => {
    // ルーティング用のフック
    const navigate = useNavigate();
    const user_id = localStorage.getItem('T-lab_userid') || "";

    // 各種状態の定義
    const [isHomeValues, setisHomeValues] = useState(true);
    const [showNavigateValues, setshowNavigateValues] = useState(false);
    const [loginuser, setloginuser] = useState("");
    const [isAdmin, setisAdmin] = useState(false);
    const [isAdminView, setisAdminView] = useState(false);
    const [isplayground, setisplayground] = useState(false);

    // 月額料金の設定
    let monthpay = 500;

    // ナビゲーションの表示制御関数
    const showNavigate = () => {
        setshowNavigateValues(true);
    };
    const hideNavigate = () => {
        setshowNavigateValues(false);
    };

    // ユーザーの認証の確認
    useEffect(() => {
        async function verify() {
            const user_name = localStorage.getItem('T-lab_username') || "";
            const user_id = localStorage.getItem('T-lab_userid') || "";
            const user_token = localStorage.getItem('T-Lab_token') || "";
            const roomname = localStorage.getItem('T-Lab_roomname') || "";
    
            // ログイン情報がない場合は即ログアウト
            if (!user_name || !user_id || !user_token || !roomname) {
                navigate('/login');
                return;
            }
    
            try {
                const response = await axios.post(`${baseurl}/user/auth`, {
                    roomname: roomname,
                    username: user_name,
                    password: user_token
                });
    
                // 認証失敗
                if (typeof response.data !== "object") {
                    localStorage.removeItem('T-lab_username');
                    localStorage.removeItem('T-lab_userid');
                    localStorage.removeItem('T-Lab_token');
                    localStorage.removeItem('T-Lab_roomname');
                    navigate('/login');
                } else {
                    setloginuser(response.data.name);
                    setisAdmin(response.data.is_admin);
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem('T-lab_username');
                localStorage.removeItem('T-lab_userid');
                localStorage.removeItem('T-Lab_token');
                localStorage.removeItem('T-Lab_roomname');
                navigate('/login');
            }
        }
        verify();
    }, [baseurl, navigate]);

    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    {/* サイドのナビゲーションバー */}
                    <Navigate user_id={user_id} setisHomeValues={setisHomeValues} showNavigateValues={showNavigateValues} setshowNavigateValues={setshowNavigateValues} isAdmin={isAdmin} setisAdminView={setisAdminView} isplayground={isplayground} setisplayground={setisplayground} />
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/* ページトップのタブ */}
                                <Tab showNavigateValues={showNavigateValues} showNavigate={showNavigate} />
                                {/* <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">
                                    <div className="topbar-divider d-none d-sm-block"></div>
                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">
                                        <button className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={hideNavigate}>
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{loginuser}</span>
                                            <i className="fas fa-solid fa-user fa-2s text-gray-300"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                            {/* ページのコンテンツ部分 */}
                            <Content isHome={isHomeValues} isAdminView={isAdminView} isplayground={isplayground} user_id={user_id} baseurl={baseurl} monthpay={monthpay} />
                        </div>
                    </div>
                </div>
                {/* ページのフッター部分 */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Takemura Lab</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Root;