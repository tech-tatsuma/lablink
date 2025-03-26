import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Signup = ({ backendurl }) => {
    const [formData, setFormData] = useState({
        roomName: "",
        roomKey: "",
        userName: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");

    // 入力変更時のハンドラー
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // フォーム送信時のハンドラー
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${backendurl}/user/signup`, {
                roomname: formData.roomName,
                roomkey: formData.roomKey,
                username: formData.userName,
                password: formData.password,
            });

            setMessage(`Account created successfully! Welcome, ${response.data.name}.`);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.detail || "Failed to create account.");
            } else {
                setMessage("Network error or server unreachable.");
            }
        }
    };

    return (
        <>
        {/* ナビゲーションバー */}
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
                            <div className="card-body">
                                <h2 className="card-title text-center">Sign Up</h2>
                                {message && <div className="alert alert-info text-center">{message}</div>}
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
                                        <label htmlFor="roomKey" className="form-label">Room Key</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            id="roomKey"
                                            name="roomKey"
                                            value={formData.roomKey}
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
                                    <div className="mb-5">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input 
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                        <button type="submit" className="btn btn-primary w-75 d-block mx-auto btn-hover">
                                            Create Account
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
