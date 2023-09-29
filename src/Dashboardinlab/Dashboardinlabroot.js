import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './../css/sb-admin-2.css';
import './../css/sb-admin-2.min.css';
import './../Dashboardview.css';
import './../vendor/fontawesome-free/css/all.min.css';
import Dashboardinlabcontent from "./Dashboardinlabcontent";

const Dashboardinlabroot = ({user_id, baseurl}) => {
    // ユーザーネームを取得
    const username = localStorage.getItem('T-lab_username');

    const navigate = useNavigate();
    // ログインユーザーの情報を格納する変数
    const [loginuser, setloginuser] = useState("");

    // ユーザーネームをAPI経由で取得するための関数
    async function getUserId(username) {
        try {
            // ユーザーデータ全てを取得し、usersへ格納
            const response = await axios.get(baseurl + '/user');
            const users = response.data;
            // usernameが一致するユーザーの情報をuserへ格納
            const user = users.find(user => user.name === username);

            if (user) { //もしユーザーが見つかったらユーザーidを返す
                return user.id;
            } else { //もしユーザーが見つからなかったらnullを返す
                console.log('失敗');
                console.log(response.data);
                return null;
            }

        } catch (error) { //もしapiへのリクエストが失敗したらローカルストレージからユーザーデータを削除し、ログイン画面へ
            console.log('そもそも取れてないよー');
            console.error(error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('T-lab_username');
            navigate('/login');
        }
    };
    const requests = {
        fetchloginuserinfo: `/user/get_user/${user_id}`
    };

    // ユーザーIDからユーザーの情報を取得する
    useEffect(() => {
        //データを取得する非同期関数を定義し、その関数を実行する
        async function fetchData() {
            try {
                //axiosを利用し、データを取得
                axios.get(baseurl + requests.fetchloginuserinfo).then((res) => {
                    if (res.data) {
                        setloginuser(res.data["name"]);
                    } else {
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

    useEffect(() => {
        getUserId(username).then(id => {
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