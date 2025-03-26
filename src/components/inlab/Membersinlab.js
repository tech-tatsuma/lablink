import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Memberrootinlab from "./Memberrootinlab";

const Membersinlab = ({ baseurl, user_id }) => {
    // 全てのユーザー情報を取得し、リスト化する
    const [allmembersValues, setallmembersValues] = useState([]);
    const [counter, setCounter] = useState(true);
    const roomname = localStorage.getItem('T-Lab_roomname') || "";

    useEffect(() => {
        async function fetchAllMembers() {
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                setallmembersValues(res.data)
            }
            console.log("type: " + typeof (allmembersValues));
            console.log("data: " + allmembersValues);
        };
        fetchAllMembers();
    }, []);
    useEffect(() => {
        async function fetchAllMembers() {
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                setallmembersValues(res.data)
            }
            console.log("type: " + typeof (allmembersValues));
            console.log("data: " + allmembersValues);
        };
        fetchAllMembers();
    }, [counter]);


    return (
        <div className="row">
            {allmembersValues.map((member, index) =>
                <>
                    <Memberrootinlab key={index} details={member} baseurl={baseurl} user_id={user_id} counter={counter} setCounter={setCounter} />
                </>
            )}
        </div>
    );

}

export default Membersinlab;