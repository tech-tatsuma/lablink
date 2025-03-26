import React from "react";

// 管理者画面の中のメンバー一人一人の表示を行うコンポーネント
const EachMemberinAdmin = ({ details, baseurl, setChangeView, changeview, setUpdate, setswitchview }) => {

    return (
        <div className="col-lg-6 mb-4">
                <div className="card bg-secondary text-white shadow">
                    <div className="card-body">
                        <h5 className="mb-2">{details.name}</h5>
                        <p className="mb-1 small">currentpay: {details.current_pay}</p>
                        <p className="mb-0 small">id: {details.user_id_inroom}</p>
                    </div>
                </div>
            </div >
    )
};

export default EachMemberinAdmin;
