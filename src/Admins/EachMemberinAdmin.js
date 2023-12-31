import React from "react";
import axios from "axios";

// 管理者画面の中のメンバー一人一人の表示を行うコンポーネント
const EachMemberinAdmin = ({ details, baseurl, setChangeView, changeview, setUpdate, setswitchview }) => {
    // メンバーの情報を更新する関数
    const update = () => {
        const updatedata = {
            'name': details.name,
            'icon': details.icon,
            'birthday': details.birthday,
            'is_admin': details.is_admin,
            'at_office': details.at_office,
            'current': details.current + 1,
            'target': details.target
        }
        axios.post(baseurl + '/user/update/' + details.id, updatedata).then(res => {
            setChangeView(changeview + 1);
            setUpdate(prevState => !prevState);
            setswitchview(prevState => !prevState);
        })
    }

    // メンバーの情報を表示する
    if (details.current >= details.target) {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card bg-secondary text-white shadow">
                    <div className="card-body">
                        {details.name}<br />
                        target: {details.target}<br />
                        current: {details.current}
                        <div className="text-white-50 small">completed</div>
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <div className="col-lg-6 mb-4">
                <a onClick={update}>
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            {details.name}<br />
                            target: {details.target}<br />
                            current: {details.current}
                            <div className="text-white-50 small">not payed</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    };
};

export default EachMemberinAdmin;
