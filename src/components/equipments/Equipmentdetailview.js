import React from "react";
import './css/Equipmentdetailview.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

// 備品の詳細を表示するコンポーネント
const Equipmentdetailview = ({ baseurl, isdetailValue, setisdetailvalue, setdetailevalue, detailvalue }) => {
    // 備品の購入者のデータを格納する変数
    const [username, setusername] = useState('');
    const room_name = localStorage.getItem("T-Lab_roomname");

    // 備品の詳細ページを表示する関数
    const switchisdetailValue = () => {
        setisdetailvalue(false);
    };

    // 備品のデータを削除する関数
    const deletedata = async () => {
        try {
            await axios.delete(`${baseurl}/equipment/${detailvalue['id']}`);
            setisdetailvalue(false);
        } catch (error) {
            console.error(error);
        }
    };

    // 備品を使い切ったときの処理を行う関数
    const finishequipment = async () => {
        const postdata = {
            "name": detailvalue['name'],
            "price": detailvalue['price'],
            "buyer_id": detailvalue['buyer_id'],
            "room_name": room_name,
            "bought_date": detailvalue['bought_date']
        }
        try {
            await axios.post(`${baseurl}/equipment/history/`, postdata).then(res => {
                axios.delete(`${baseurl}/equipment/${detailvalue['id']}`).then(res => {
                    setisdetailvalue(false);
                })
            })
        } catch (error) {
            console.error(error);
        }
    }

    // 備品の購入者のデータを取得する関数
    useEffect(() => {
        async function getusername() {
            try {
                await axios.get(`${baseurl}/user/get_user/${detailvalue['buyer_id']}`).then(res => {
                    setusername(res.data.name);
                })
            } catch (error) {
                console.error(error);
            }
        };
        getusername();
    }, [])

    return (
        <>
            <table className='font-japanese'>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>{detailvalue['name']}</td>
                    </tr>
                    <tr>
                        <td>price</td>
                        <td>{detailvalue['price']}</td>
                    </tr>
                    <tr>
                        <td>buyer</td>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <td>bought_date</td>
                        <td>{detailvalue['bought_date']}</td>
                    </tr>
                </tbody>
            </table>
            <div className="card-body">
                <button className="btn btn-primary btn-icon-split" onClick={switchisdetailValue}>
                    <span className="icon text-white-50">
                        <i className="fas fa-solid fa-list"></i>
                    </span>
                    <span className="text">リストに戻る</span>
                </button>
            </div>
            <div className="card-body">
                <button className="btn btn-success btn-icon-split" onClick={finishequipment}>
                    <span className="icon text-white-50">
                        <i className="fas fa-check"></i>
                    </span>
                    <span className="text">備品使い切り</span>
                </button>
            </div>
            <div className="card-body">
                <button className="btn btn-danger btn-icon-split" onClick={deletedata}>
                    <span className="icon text-white-50">
                        <i className="fas fa-trash"></i>
                    </span>
                    <span className="text">削除</span>
                </button>
            </div>
        </>
    );
};

export default Equipmentdetailview;
