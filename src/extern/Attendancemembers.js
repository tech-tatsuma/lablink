import React from "react";
import axios from "axios";
import Attendancememberroot from "./Attendancememberroot";
import {useState, useEffect} from "react";

const Attendancemembers = ({baseurl}) => {
    const [allmembersValues, setallmembersValues] = useState([]);

    let fetchallmember = `/user`;

    useEffect(() => {
        async function fetchAllMembers() {
            console.log('axios in memberjs')
            const res = await axios.get(baseurl + fetchallmember);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => a.id - b.id);
                setallmembersValues(res.data)
            }
            console.log("type: " + typeof (allmembersValues));
            console.log("data: " + allmembersValues);
        };
        fetchAllMembers();
    }, []);


    return (
        <div className="row">
        {allmembersValues.map((member, index) =>
            <>
            {/* Noriko Takemuraの前後に空のdivを配置 */}
            {member.name === "Noriko Takemura" && (
                <>
                    <div className="col-lg-4 mb-4"></div>
                    <Attendancememberroot key={index} details={member} />
                    <div className="col-lg-4 mb-4"></div>
                </>
            )}
            {member.name !== "Noriko Takemura" && (
                <Attendancememberroot key={index} details={member} />
            )}
        </>
        )}
    </div>
    );
}

export default Attendancemembers;