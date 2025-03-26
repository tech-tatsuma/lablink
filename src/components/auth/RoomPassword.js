import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RoomPassword = ({backendurl}) => {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [roomData, setRoomData] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setRoomData(null);

        try {
            const response = await axios.post(`${backendurl}/room/get_room_info`, {
                room_name: roomName,
                password: password
            });
            setRoomData(response.data);
        } catch (error) {
            console.error("Error fetching room info:", error);
            setError("部屋が見つかりません。Room Name または Password が間違っています。");
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("コピーしました: " + text);
    };

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
                            <div className="card-body">
                                <h3 className="card-title text-center">Room Password Checker</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5">
                                        <label htmlFor="roomName" className="form-label">Room Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="roomName" 
                                            value={roomName} 
                                            onChange={(e) => setRoomName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-75 d-block mx-auto btn-hover">
                                        Submit
                                    </button>
                                </form>

                                {error && (
                                    <div className="mt-4 alert alert-danger text-center">
                                        {error}
                                    </div>
                                )}

                                {roomData && (
                                    <div className="mt-4 p-3 border rounded bg-light">
                                        <p className="text-muted">
                                            Room Password は通常アカウント作成用、Admin Password は管理者アカウント作成用です。コピーして適切に管理してください。
                                        </p>
                                        <div className="mb-2 d-flex align-items-center">
                                            <span className="fw-bold me-2">Room Password:</span>
                                            <div className="text-monospace overflow-auto" style={{ maxWidth: "100%", whiteSpace: "nowrap" }}>{roomData.user_password}</div>
                                            <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => copyToClipboard(roomData.user_password)}>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="fw-bold me-2">Admin Password:</span>
                                            <div className="text-monospace overflow-auto" style={{ maxWidth: "100%", whiteSpace: "nowrap" }}>{roomData.admin_password}</div>
                                            <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => copyToClipboard(roomData.admin_password)}>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomPassword;