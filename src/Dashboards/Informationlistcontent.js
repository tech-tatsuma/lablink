import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Information from "./Information";

const DUMMY_INFORMATIONS = [
    { id: 1, title: "情報1", content: "内容1", created_at: "2023-01-01" },
    { id: 2, title: "情報2", content: "内容2", created_at: "2023-01-02" },
    // その他のダミー情報
];

const Informationlistcontent = ({ user_id, baseurl, setisdetailvalue, setdetailevalue }) => {
    const [informationsValues, setinformationValues] = useState([]);
    let fetchequipment = `/information`;
    useEffect(() => {
        // ダミーデータをセットする
        setinformationValues(DUMMY_INFORMATIONS);
    }, []);
    return (
        <>
            {informationsValues.map((information, index) =>
                <Information key={index} details={information} setisdetailvalue={setisdetailvalue} setdetailevalue={setdetailevalue} />
            )}
        </>
    )
};

export default Informationlistcontent;