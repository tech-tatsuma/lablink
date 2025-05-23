import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Equipment from "./Equipment";
import './css/Equipmentlistcontent.css';

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Equipmentlistcontent = ({ user_id, baseurl, setisdetailvalue, setdetailevalue }) => {
    const [equipmentsValues, setequipmentValues] = useState([]);

    let fetchequipment = `/equipment`;

    useEffect(() => {
        async function fetchequipmentdata() {
            const res = await axios.get(baseurl + fetchequipment);
            if (res.data && Array.isArray(res.data)) {
                setequipmentValues(res.data);
            }
        };
        fetchequipmentdata();
    }, []);

    return (
        <>
            <table className='font-japanese'>
                <thead>
                    <tr>
                        <th>備品名</th>
                        <th>コスト</th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentsValues.map((equipment, index) =>
                        <Equipment key={index} details={equipment} setisdetailvalue={setisdetailvalue} setdetailevalue={setdetailevalue} />
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Equipmentlistcontent;