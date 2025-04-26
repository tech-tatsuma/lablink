import React from "react";
import axios from "axios";
import Attendancememberroot from "./Attendancememberroot";
import {useState, useEffect} from "react";

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Attendancemembers = ({baseurl, roomname}) => {
    const [allmembersValues, setallmembersValues] = useState([]);

    useEffect(() => {
        async function fetchAllMembers() {
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