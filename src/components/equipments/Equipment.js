import React from "react";

// 設備管理画面の中の設備一つ一つの表示を行うコンポーネント
const Equipment = ({ details, setisdetailvalue, setdetailevalue }) => {
    // 設備の詳細を表示する関数
    const switchisdetailvalue = () => {
        let detail = { 'id': details.id, 'name': details.name, 'price': details.price, 'buyer_id': details.buyer_id, 'bought_date': details.bought_date };
        setdetailevalue(detail);
        setisdetailvalue(true);
    };
    
    return (
        <>
            <tr>
                <td><button
                onClick={switchisdetailvalue}
                className="btn btn-link p-0 text-decoration-none"
                style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}
                >
                {details.name}
                </button></td>
                <td>{details.price}</td>
            </tr>
        </>
    );
};

export default Equipment;