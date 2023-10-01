import React from "react";
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import 'Memberrootinlab.css';

const Memberrootinlab = ({details, baseurl, user_id, counter, setCounter}) => {

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
                        setCounter(!counter);
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

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCounter(!counter);
        }, 60000);

        return () => clearInterval(intervalId);
    },[counter]);
    
    if (details.name=="Noriko Takemura"){
        if (!details.at_office) {
            return (
                <div className="col-lg-4 mb-4" onClick={handleClick}>
                    <div className="card bg-secondary text-white shadow">
                        <div className="card-body">
                            <div className="card-body-content">
                            {details.name}
                            <div className="text-white-50 small">not office</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-lg-4 mb-4" onClick={handleClick}>
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            <div className="card-body-content">
                            {details.name}
                            <div className="text-white-50 small">at office</div>
                            </div>
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
                            <div className="card-body-content">
                            {details.name}
                            <div className="text-white-50 small">not office</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-lg-4 mb-4" onClick={handleClick}>
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                            <div className="card-body-content">
                            {details.name}
                            <div className="text-white-50 small">at office</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };
    }
}

export default Memberrootinlab;