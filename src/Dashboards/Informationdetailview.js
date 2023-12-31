import React from "react";
import './../Equipments/Equipmentdetailview.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DUMMY_DATA = {
    id: 1,
    title: "テストタイトル",
    content: "テストコンテンツ",
    url: "https://example.com",
    created_at: "2023-01-01",
    created_by: "テストユーザー"
};

// 掲示板の詳細を表示するコンポーネント
const Informationdetailview = ({ user_id, baseurl, setisdetailvalue, setdetailevalue, isdetailValue, detailvalue }) => {
    // 投稿者のデータを格納する変数
    const username = DUMMY_DATA.created_by;

    const switchisdetailValue = () => {
        setisdetailvalue(false);
    };

    const deletedata = () => {
        // データ削除のシミュレーション
        console.log("データが削除されました: ", DUMMY_DATA.id);
        setisdetailvalue(false);
    };

    // useEffect(() => {
    //     async function getusername() {
    //         try {
    //             await axios.get(`${baseurl}/user/get_user/${detailvalue['created_by']}`).then(res => {
    //                 console.log(res.data.name);
    //                 setusername(res.data.name);
    //             })
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getusername();
    // }, [])
    return (
        <>
            <table className='font-japanese'>
                <tbody>
                    <tr>
                        <td>title</td>
                        <td>{detailvalue['title']}</td>
                    </tr>
                    <tr>
                        <td>content</td>
                        <td>{detailvalue['content']}</td>
                    </tr>
                    <tr>
                        <td>url</td>
                        <td><a href={detailvalue['url']}>{detailvalue['url']}</a></td>
                    </tr>
                    <tr>
                        <td>created_at</td>
                        <td>{detailvalue['created_at']}</td>
                    </tr>
                    <tr>
                        <td>created_by</td>
                        <td>{username}</td>
                    </tr>
                </tbody>
            </table>
            <div className="card-body">
                <a className="btn btn-success btn-icon-split" onClick={switchisdetailValue}>
                    <span className="icon text-white-50">
                        <i className="fas fa-solid fa-list"></i>
                    </span>
                    <span className="text">リストに戻る</span>
                </a>
            </div>
            <div className="card-body">
                <a className="btn btn-danger btn-icon-split" onClick={deletedata}>
                    <span className="icon text-white-50">
                        <i className="fas fa-trash"></i>
                    </span>
                    <span className="text">削除</span>
                </a>
            </div>
        </>
    );
};

export default Informationdetailview;
