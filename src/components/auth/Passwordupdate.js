import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Passwordupdate = ({ baseurl }) => {
    const [formData, setFormData] = useState({
        roomName: "",
        userName: "",
        roomPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setSuccess(false);

        const { roomName, userName, roomPassword, newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            setMessage("新しいパスワードが一致しません。");
            return;
        }

        try {
            await axios.post(`${baseurl}/user/update_password`, {
                room_name: roomName,
                username: userName,
                room_password: roomPassword,
                new_password: newPassword
            });

            setSuccess(true);
            setMessage("パスワードを更新しました。");
            setFormData({
                roomName: "",
                userName: "",
                roomPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("パスワード更新中にエラーが発生しました。");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="card-title text-center mb-4">Password Update</h2>

                        {message && (
                            <div className={`alert ${success ? 'alert-success' : 'alert-danger'} text-center`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
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

                            <div className="mb-3">
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

                            <div className="mb-3">
                                <label htmlFor="roomPassword" className="form-label">Room Admin Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="roomPassword"
                                    name="roomPassword"
                                    value={formData.roomPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
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

                            <button type="submit" className="btn btn-primary w-100">
                                パスワード更新
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Passwordupdate;
