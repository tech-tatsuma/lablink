import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Lackequipment from "./Lackequipment";

// 備品の不足リストを表示するコンポーネント
const Equipmentlacklistcontent = ({ user_id, baseurl }) => {
    // 備品の不足リストを格納する変数
    const [lackequipmentsValues, setlackequipmentsValues] = useState([]);
    let fetchlackequipment = `/lack`;
    const [redirectvar, setredirectvar] = useState(0);

    useEffect(() => {
        async function fetchlackequipmentdata() {
            console.log(baseurl + fetchlackequipment)
            const res = await axios.get(baseurl + fetchlackequipment);
            if (res.data && Array.isArray(res.data)) {
                setlackequipmentsValues(res.data)
            }
        };
        fetchlackequipmentdata();
    }, [redirectvar]);

    return (
        <>
            <table className='font-japanese'>
                <thead>
                    <tr>
                        <th>備品名</th>
                    </tr>
                </thead>
                <tbody>
                    {lackequipmentsValues.map((equipment, index) =>
                        <Lackequipment key={index} details={equipment} redirectvar={redirectvar} setredirectvar={setredirectvar} baseurl={baseurl} />
                    )}
                </tbody>
            </table>
        </>
    );

}

export default Equipmentlacklistcontent;