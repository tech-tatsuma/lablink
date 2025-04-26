import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Memberroot from './Memberroot';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Members = ({ baseurl }) => {
    // room name情報を取得
    const roomname = localStorage.getItem('T-Lab_roomname') || "";

    // ユーザー情報を格納
    const [allmembersValues, setallmembersValues] = useState([]);

    useEffect(() => {
        async function fetchAllMembers() {
            try {
                const response = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
                if (response.data && Array.isArray(response.data)) {
                    response.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                    setallmembersValues(response.data);
                }
        } catch (error) {
            console.error(error);
        }
        };
        fetchAllMembers();
    }, [baseurl, roomname]);



    return (
        <div className="row">
            {allmembersValues.map((member, index) =>
                <Memberroot key={index} details={member} />
            )}
        </div>
    );
};

export default Members;