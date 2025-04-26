import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Login = ({ backendurl }) => {
    const [formData, setFormData] = useState({
        roomName: "",
        userName: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // 入力値を更新する関数
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // フォーム送信時の処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post(`${backendurl}/user/auth`, {
                roomname: formData.roomName,
                username: formData.userName,
                password: formData.password
            });

            // 認証成功
            if (response.data && typeof response.data === "object") {
                localStorage.setItem("T-lab_username", response.data.name);
                localStorage.setItem("T-lab_userid", response.data.id);
                localStorage.setItem("T-Lab_token", formData.password);
                localStorage.setItem("T-Lab_roomname", formData.roomName);
                navigate("/dashboard"); // ダッシュボードに遷移
            } else {
                // 認証失敗（メッセージを表示）
                console.log("認証失敗:", response.data);
                setMessage(response.data);
            }
        } catch (error) {
            console.error("エラーハンドリング:", error);
            setMessage("Network error or server unreachable.");
        }
    };

    // 自動でログインを行う関数
    useEffect(() => {
        async function autoLogin() {
            const username = localStorage.getItem("T-lab_username");
            const roomname = localStorage.getItem("T-Lab_roomname");
            const password = localStorage.getItem("T-Lab_token");
    
            if (username && roomname && password) {
                try {
                    const response = await axios.post(`${backendurl}/user/auth`, {
                        roomname: roomname,
                        username: username,
                        password: password
                    });
    
                    if (response.data && typeof response.data === "object") {
                        navigate("/dashboard");
                    } else {
                        console.log("自動ログイン失敗:", response.data);
                    }
                } catch (error) {
                    console.error("自動ログイン中のエラー:", error);
                }
            }
        }
    
        autoLogin();
    }, [backendurl, navigate]);

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                        <div className="container-fluid">
                          <Link className="navbar-brand" to="/">武村研究室</Link>
                          <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                              <li className="nav-item">
                                <Link className="nav-link" to="/roomcreate">部屋の作成</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" to="/roomcheck">部屋情報の確認</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" to="/signup">アカウント作成</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" to="/login">ログイン</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <h2 className="mt-5 card-title text-center">Login</h2>
                            {message && <div className="alert alert-danger text-center">{message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="roomName" className="form-label">Room Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="roomName"
                                        name="roomName"
                                        value={formData.roomName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="userName" className="form-label">User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-75 d-block mx-auto btn-hover">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
