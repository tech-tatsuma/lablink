import React from "react";
import axios from 'axios';
import MembersinAdmin from "./MembersinAdmin";
import { useState, useEffect } from 'react';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

// 管理者ページ
const Admin = ({ baseurl }) => {
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [newRoomNumber, setNewRoomNumber] = useState("");
    const roomname = localStorage.getItem("T-Lab_roomname");
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    useEffect(() => {
        async function fetchAllMembers() {
            const response = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (response.data && Array.isArray(response.data)) {
                response.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                setUsers(response.data);
            }
        }

        fetchAllMembers();
    }, [roomname, baseurl]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload = {
                user_id: Number(selectedUserId),
                user_name: userName === "" ? null : userName,
                current_pay: paymentAmount === "" ? null : Number(paymentAmount),
                user_id_inroom: newRoomNumber === "" ? null : Number(newRoomNumber),
                is_admin: isAdmin
            };

            await axios.post(`${baseurl}/user/update_user_payid`, payload);
            setUpdate(prev => !prev);
            alert("更新が完了しました");
        } catch (error) {
            console.error("更新エラー:", error);
            alert("更新中にエラーが発生しました");
        }
        setIsLoading(false);
    };

    const handleRoomDelete = async () => {
        if (window.confirm("本当にこの部屋を削除しますか？この操作は元に戻せません。")) {
            try {
                await axios.delete(`${baseurl}/room/${roomname}`);
                alert("部屋が削除されました。");
                // 必要ならリダイレクト処理など
            } catch (error) {
                console.error("削除エラー:", error);
                alert("部屋の削除に失敗しました。");
            }
        }
    };
    const handleUserDelete = async () => {
        if (!selectedUserId) {
            alert("削除するユーザーを選択してください。");
            return;
        }
    
        if (window.confirm("本当にこのユーザーを削除しますか？")) {
            try {
                await axios.delete(`${baseurl}/user/${selectedUserId}`);
                alert("ユーザーが削除されました。");
                setUpdate(prev => !prev); // 更新をトリガー
                setSelectedUserId("");
                setUserName("");
                setPaymentAmount("");
                setNewRoomNumber("");
                setIsAdmin(false);
            } catch (error) {
                console.error("ユーザー削除エラー:", error);
                alert("ユーザーの削除に失敗しました。");
            }
        }
    };
    

    if (isLoading) {
        return <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw' }} />;
    }
    return (
        <>
            <div className="container-fluid">

                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                {/* <!-- Content Row --> */}
                <div className="row">
                    {/* <!-- Content Column --> */}
                    <div className="col-lg-6 mb-4">
                        <MembersinAdmin baseurl={baseurl} update={update} setUpdate={setUpdate} />
                    </div>
                    {/* <!-- Content Column --> */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">管理者設定フォーム</h6>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="deleteModeSwitch"
                                        checked={isDeleteMode}
                                        onChange={() => setIsDeleteMode(!isDeleteMode)}
                                    />
                                    <label className="form-check-label" htmlFor="deleteModeSwitch">スーパーユーザーモード</label>
                                </div>
                            </div>
                            <div className="card-body">
                            {isDeleteMode ? (
                                    <button className="btn btn-danger" onClick={handleRoomDelete}>
                                        部屋を削除
                                    </button>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label>ユーザーを選択</label>
                                            <select
                                                className="form-control"
                                                value={selectedUserId}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    setSelectedUserId(selectedId);
                                                    const selectedUser = users.find(u => u.id.toString() === selectedId);
                                                    if (selectedUser) {
                                                        setUserName(selectedUser.name || "");
                                                        setIsAdmin(selectedUser.is_admin || false);
                                                    } else {
                                                        setUserName("");
                                                        setIsAdmin(false);
                                                    }
                                                }}
                                                required
                                            >
                                                <option value="">-- ユーザーを選択 --</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>ユーザー名（空欄で変更なし）</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="例: 山田太郎"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>支払い金額（空欄で変更なし）</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={paymentAmount}
                                                onChange={(e) => setPaymentAmount(e.target.value)}
                                                placeholder="例: 1000"
                                            />
                                        </div>

                                        <div className="form-group mb-5">
                                            <label>部屋内の新しいユーザー番号（空欄で変更なし）</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={newRoomNumber}
                                                onChange={(e) => setNewRoomNumber(e.target.value)}
                                                placeholder="例: 5"
                                            />
                                        </div>

                                        <div className="form-group form-check mb-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isAdminCheck"
                                                checked={isAdmin}
                                                onChange={(e) => setIsAdmin(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="isAdminCheck">管理者権限を付与</label>
                                        </div>

                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-primary w-30">
                                                更新
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-outline-danger w-30" onClick={handleUserDelete}>
                                                削除
                                            </button>
                                        </div>

                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;