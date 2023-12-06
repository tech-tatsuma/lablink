import React from 'react';
import './css/sb-admin-2.css';
import './css/sb-admin-2.min.css';
import './vendor/fontawesome-free/css/all.min.css';
import './Dashboardview.css'; //　ダッシュボード固有のCSSをインポート
import Dashboardcontent from './Dashboardcontent'; // ダッシュボードのメインコンテンツコンポーネントをインポート
import { useState, useEffect } from 'react';
import Navigate from './Navigate'; // ナビゲーションバーのコンポーネントをインポート
import Tab from './Tab'; // タブのコンポーネントをインポート
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ダッシュボードのルートコンポーネント
const Dashboardroot = ({ user_id, baseurl }) => {
    // ローカルストレージからユーザー名を取得
    const username = localStorage.getItem('T-lab_username');
    // ルーティング用のフック
    const navigate = useNavigate();

    // 各種状態の定義
    const [isHomeValues, setisHomeValues] = useState(true);
    const [showNavigateValues, setshowNavigateValues] = useState(false);
    const [loginuser, setloginuser] = useState("");
    const [isAdmin, setisAdmin] = useState(false);
    const [isAdminView, setisAdminView] = useState(false);
    const [isSummaryView, setisSummaryView] = useState(false);
    const [isSearchpaper, setisSearchpaper] = useState(false);
    const [isplayground, setisplayground] = useState(false);
    const [isimagedescription, setisimagedescription] = useState(false);
    const [isAssistant, setisAssistant] = useState(false);
    const [isCatMoving, setIsCatMoving] = useState(true);
    const [catPositionLeft, setCatPositionLeft] = useState(0);
    const [catImageSrc, setCatImageSrc] = useState("/img/gray_walk_8fps.gif");

    // 猫のアニメーションのトグル関数
    const toggleCatAnimation = () => {
        // 猫のアニメーション状態を切り替え
        setIsCatMoving(!isCatMoving);
        // 猫の位置と画像を更新
        if (isCatMoving) {
            const maxLeftPosition = window.innerWidth - 50;
            const randomLeftPosition = Math.floor(Math.random() * maxLeftPosition);
            setCatPositionLeft(randomLeftPosition);

            const showLieImage = Math.random() < 0.3; // 約20%の確率
            setCatImageSrc(showLieImage ? "/img/gray_lie_8fps.gif" : "/img/gray_with_ball_8fps.gif");
          } else {
            setCatImageSrc("/img/gray_walk_8fps.gif");
          }
    };

    // 月額料金の設定
    let monthpay = 500;

    // ユーザーIDを取得する非同期関数
    async function getUserId(username) {
        try {
            console.log(baseurl + '/user')
            const response = await axios.get(baseurl + '/user');
            const users = response.data;

            const user = users.find(user => user.name === username);

            if (user) {
                return user.id;
            } else {
                console.log('失敗');
                console.log(response.data);
                return null;
            }
        } catch (error) {
            console.log('そもそも取れてないよー');
            console.error(error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('T-lab_username');
            navigate('/login');
        }
    };

    // ナビゲーションの表示制御関数
    const showNavigate = () => {
        setshowNavigateValues(true);
    };

    const hideNavigate = () => {
        setshowNavigateValues(false);
    };

    // ユーザー情報取得のリクエスト
    const requests = {
        fetchloginuserinfo: `/user/get_user/${user_id}`
    };
    // ユーザー情報取得のための副作用
    useEffect(() => {
        //データを取得する非同期関数を定義し、その関数を実行する
        async function fetchData() {
            try {
                //axiosを利用し、データを取得
                axios.get(baseurl + requests.fetchloginuserinfo).then((res) => {
                    if (res.data) {
                        console.log('ユーザー情報が取れています。')
                        setloginuser(res.data["name"]);
                        setisAdmin(res.data['is_admin']);
                    } else {
                        console.log('ユーザー情報が取れていません')
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('T-lab_username');
                        navigate('/login');
                    }
                });
            } catch (error) {
                console.error(error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('T-lab_username');
                navigate('/login');
            }
        }
        fetchData();
    }, [user_id]);

    // ユーザーIDの一致確認
    useEffect(() => {
        getUserId(username).then(id => {
            console.log(user_id !== id);
            console.log(user_id);
            console.log(id);
            if (Number(user_id) !== Number(id)) {
                console.log('user!==id');
                console.log(typeof(user_id));
                console.log(typeof(id));
                localStorage.removeItem('access_token');
                localStorage.removeItem('T-lab_username');
                navigate('/login');
            }
        })
    }, []);

    return (
        // ダッシュボードのHTML構造
        <>
            {/* <!-- Page Wrapper --> */}
            <div id="page-top">
                <div id="wrapper">

                    {/* <!-- Sidebar --> */}
                    <Navigate user_id={user_id} setisHomeValues={setisHomeValues} showNavigateValues={showNavigateValues} setshowNavigateValues={setshowNavigateValues} isAdmin={isAdmin} setisAdminView={setisAdminView} isSummaryView={isSummaryView} setisSummaryView={setisSummaryView} isSearchpaper={isSearchpaper} setisSearchpaper={setisSearchpaper} isplayground={isplayground} setisplayground={setisplayground} setisimagedescription={setisimagedescription} setisAssistant={setisAssistant} />

                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                {/* <!-- Sidebar Toggle (Topbar) --> */}
                                <Tab showNavigateValues={showNavigateValues} showNavigate={showNavigate} />


                                {/* <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">


                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={hideNavigate}>
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{loginuser}</span>
                                            {/* <img class="img-profile rounded-circle" */}
                                            {/* src="#" /> */}
                                            <i className="fas fa-solid fa-user fa-2s text-gray-300"></i>
                                        </a>
                                    </li>

                                </ul>

                            </nav>
                            {/* ページのコンテンツ部分 */}
                            <Dashboardcontent isHome={isHomeValues} isAdminView={isAdminView} isSummaryView={isSummaryView} isSearchpaper={isSearchpaper} isplayground={isplayground} user_id={user_id} baseurl={baseurl} monthpay={monthpay} isimagedescription={isimagedescription} isAssistant={isAssistant} />
                        </div>
                    </div>
                </div>
                {/* <!-- End of Page Wrapper --> */}
                <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Takemura Lab</span>
                    </div>
                </div>
                <div className={`cat-animation ${isCatMoving ? "cat-animation-moving" : "cat-animation-stationary"}`} style={{ left: isCatMoving ? 0 : catPositionLeft }}>
                    <img className="cat-image" src={catImageSrc} alt="Walking Cat" onClick={toggleCatAnimation} style={{ left: isCatMoving ? 0 : catPositionLeft }} />
                </div>
                </footer>
                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </>
    );
};

export default Dashboardroot;