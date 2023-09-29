import React from "react";
import axios from "axios";
import { useState } from "react";
import Memberrootinlab from "./Memberrootinlab";

const Membersinlab = ({baseurl, user_id}) => {
    // 全てのユーザー情報を取得し、リスト化する
    const [allmembersValues, setallmembersValues] = useState([]);

    let fetchallmember = `/user`;

    useEffect(() => {
        async function fetchAllMembers() {
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
                        <div className="col-lg-3 mb-4"></div>
                        <Memberrootinlab key={index} details={member} baseurl={baseurl} user_id={user_id}/>
                        <div className="col-lg-3 mb-4"></div>
                    </>
                )}
                {member.name !== "Noriko Takemura" && (
                    <Memberrootinlab key={index} details={member} baseurl={baseurl} user_id={user_id}/>
                )}
            </>
            )}
        </div>
    );

}

export default Membersinlab;