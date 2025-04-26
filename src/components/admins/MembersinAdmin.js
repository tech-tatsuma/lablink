import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EachMemberinAdmin from "./EachMemberinAdmin";

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const MembersinAdmin = ({ baseurl, update, setUpdate }) => {
    const [allmembersValues, setallmembersValues] = useState([]);
    const [changeview, setChangeView] = useState(0)
    const [switchview, setswitchview] = useState(true);
    const roomname = localStorage.getItem('T-Lab_roomname') || "";

    useEffect(() => {
        async function fetchAllMembers() {
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                setallmembersValues(res.data)
            }
        };
        fetchAllMembers();
    }, [update, switchview, baseurl, roomname])
    return (
        <div className="row">
            {allmembersValues.map((member, index) =>
                <EachMemberinAdmin key={index} details={member} baseurl={baseurl} setChangeView={setChangeView} changeview={changeview} setUpdate={setUpdate} setswitchview={setswitchview} />
            )}
        </div>
    );

};

export default MembersinAdmin;