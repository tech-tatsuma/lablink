import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Memberrootinlab = ({details, baseurl, user_id}) => {

    const navigate = useNavigate();

    // 状態を在室に変更するための関数
    async function switchstatus(id) {
            // ユーザーデータを全て取得
            axios.get(baseurl+`/user/get_user/${id}`).then(res=>{
                const userData = res.data;
                // 更新後のデータを作成
                if (userData) {
                    const updatedUserData = {
                        "name": userData.name,
                        "icon": userData.icon,
                        "birthday": userData.birthday,
                        "is_admin": userData.is_admin,
                        "at_office": !userData.at_office,
                        "current": userData.current,
                        "target": userData.target
                    };
                    // データを更新
                    axios.post(baseurl + `/user/update/${id}`, updatedUserData)
                    .then(res => {
                        // 画面をリダイレクト
                        navigate(`/dashboard/inlab/${user_id}`)
                    })
                    .catch(err => {
                        console.log('Error updating user Data. ',err)
                    })
                }
            }).catch(err => {
                console.log('Error catching user Data. ',err)
            })
    }

    const handleClick = () => {
        switchstatus(details.id)
    }
    if (details.name=="Noriko Takemura"){
        if (!details.at_office) {
            return (
                <div className="col-lg-4 mb-4" onClick={handleClick}>
                    <div className="card bg-secondary text-white shadow">
                        <div className="card-body">
                            {details.name}
                            <div className="text-white-50 small">not office</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-lg-4 mb-4">
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            {details.name}
                            <div className="text-white-50 small">at office</div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {

        if (!details.at_office) {
            return (
                <div className="col-lg-4 mb-4" onClick={handleClick}>
                    <div className="card bg-secondary text-white shadow">
                        <div className="card-body">
                            {details.name}
                            <div className="text-white-50 small">not office</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-lg-4 mb-4">
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            {details.name}
                            <div className="text-white-50 small">at office</div>
                        </div>
                    </div>
                </div>
            )
        };
    }
}

export default Memberrootinlab;