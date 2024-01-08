import "./../css/Loginform.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

const Signupform = ({ baseurl }) => {
    // formに入力された値を格納するオブジェクトを生成する
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        admin_pass: "",
    });

    const navigate = useNavigate();

    // フォームに入力された値を格納する状態変数を準備する
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // もし、パスワードがhirofuru@ppであったならば
        if (formValues.admin_pass === 'hirofuru@pp') {
            try {
                const response = await axios.post(`${baseurl}/user`, {
                    name: formValues.username,
                    password: formValues.password,
                    icon: "",
                    birthday: 1,
                    is_admin: false,
                    at_office: false,
                    current: 0,
                    target: 0

                });
                // 成功時の処理（例：ユーザーをダッシュボードにリダイレクトする）
                console.log('Account created:', response.data);
                navigate('/login');
            } catch (error) {
                // エラー処理
                console.error('Error creating account:', error);
            }
        // もし、パスワードがhirofuru@ppadminであったならば
        } else if (formValues.admin_pass === 'hirofuru@ppadmin') {
            try {
                const response = await axios.post(`${baseurl}/user`, {
                    name: formValues.username,
                    password: formValues.password,
                    icon: "",
                    birthday: 1,
                    is_admin: true,
                    at_office: false,
                    current: 0,
                    target: 0

                });
                // 成功時の処理（例：ユーザーをダッシュボードにリダイレクトする）
                console.log('Account created:', response.data);
                navigate('/login');
            } catch (error) {
                // エラー処理
                console.error('Error creating account:', error);
            }
        } else {
            // パスワードが異なった場合は警告を出す
            alert('Invalid admin pass');
        }
    };

    return (
        <>
            <div class="form-wrapper">
                <h1>Sign Up</h1>
                <form>
                    <div class="form-item">
                        <label></label>
                        <input type="text" name="username" required="required" placeholder="UserName" value={formValues.username} onChange={(e) => handleChange(e)} ></input>
                    </div>
                    <div class="form-item">
                        <label></label>
                        <input type="password" name="password" required="required" placeholder="Password" value={formValues.password} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div class="form-item">
                        <label></label>
                        <input type="password" name="admin_pass" required="required" placeholder="admin_pass" value={formValues.admin_pass} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div class="button-panel">
                        <input type="submit" className="button" title="Sign In" value="Sign In" onClick={(e) => handleSubmit(e)}></input>
                    </div>
                </form>
                <div className="form-footer">
                    <p><a href="#">　</a></p>
                    <p><a href="#">　</a></p>
                </div>
            </div>
        </>
    );
};

export default Signupform;