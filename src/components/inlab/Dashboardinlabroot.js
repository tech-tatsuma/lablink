import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../../css/sb-admin-2.css';
import './../../css/sb-admin-2.min.css';
import './../dashboard/css/Dashboardview.css';
import './../../vendor/fontawesome-free/css/all.min.css';
import './../../css/App.css';
import Dashboardinlabcontent from "./Dashboardinlabcontent";

const Dashboardinlabroot = ({baseurl}) => {
    const navigate = useNavigate();

    const user_id = localStorage.getItem('T-lab_userid') || "";

    // ユーザー認証
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
    }, [])

    return (
        <>
        {/* <!-- Page Wrapper --> */}
        <div id="page-top">
                <div id="wrapper">

                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                                {/* <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">


                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Dashboard in Lab</span>
                                            <i className="fas fa-solid fa-user fa-2s text-gray-300"></i>
                                        </a>
                                    </li>

                                </ul>

                            </nav>
                            {/* ページのコンテンツ部分 */}
                            <Dashboardinlabcontent user_id={user_id} baseurl={baseurl} />
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
                </footer>
                {/* <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </>
    )

}

export default Dashboardinlabroot;