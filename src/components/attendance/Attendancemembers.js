import React from "react";
import axios from "axios";
import Attendancememberroot from "./Attendancememberroot";
import {useState, useEffect} from "react";

const Attendancemembers = ({baseurl, roomname}) => {
    const [allmembersValues, setallmembersValues] = useState([]);

    useEffect(() => {
        async function fetchAllMembers() {
            console.log('axios in memberjs')
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => b.user_id_inroom - a.user_id_inroom);
                setallmembersValues(res.data)
            }
        };
        fetchAllMembers();
    }, [baseurl, roomname]);

    return (
    <div className="row">
        {allmembersValues.map((member, index) =>
            <Attendancememberroot key={index} details={member} />
        )}
    </div>
    );
}

export default Attendancemembers;