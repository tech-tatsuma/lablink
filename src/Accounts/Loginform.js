import "./../css/Loginform.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

// 擬似アカウント情報
const TEST_ACCOUNT = {
    username: "testuser",
    password: "testpassword",
    userId: "12345"
};

const Loginform = ({ baseurl }) => {
    //ユーザー情報を格納するオブジェクトを生成する
    const initialValues = { username: "", password: "" };
    //フォームに入力された値を格納する状態変数を準備する
    const [formValues, setFormValues] = useState(initialValues);
    //エラーメッセージを格納するためのオブジェクト
    const [formErrors, setFormErrors] = useState({})
    //ログインボタンが押されたかどうかを判別するオブジェクト
    const [isSubmit, setIsSubmit] = useState(false);
    //ログイン状態を判別するステート
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const navigate = useNavigate();

    //ログイン情報をサーバーに送信し、アクセストークンを取得する関数
    async function login(username, password) {
        return new Promise(resolve => {
            setTimeout(() => {  // 擬似的な非同期処理
                if (username === TEST_ACCOUNT.username && password === TEST_ACCOUNT.password) {
                    resolve("dummy-access-token");  // 擬似アクセストークン
                } else {
                    resolve("");
                }
            }, 1000);
        });
    }

    //アクセストークンをローカルストレージに保存する関数
    function saveToken(token, username) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('T-lab_username', username);
    }

    async function getUserId(username) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (username === TEST_ACCOUNT.username) {
                    resolve(TEST_ACCOUNT.userId);
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    //フォームに入力された値を取り出す関数
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //バリデーションチェックする
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setFormValues(initialValues);
        //エラーメッセージがなければログイン情報を発信する。
        if (Object.keys(formErrors).length === 0) {
            const token = await login(formValues.username, formValues.password);
            if (token !== "") {
                console.log('tokenはセットされています。');
                saveToken(token, formValues.username);
                setIsLoggedIn(true);
                getUserId(formValues.username).then(id => {
                    if (id) {
                        console.log(`User ID is: ${id}`);
                        navigate('/dashboard/' + id.toString());
                    } else {
                        console.log('No user with the name "string" was found.');
                    }
                });
            } else {
                setFormValues(initialValues);
                setIsSubmit(false);
                setIsLoggedIn(false);
                console.log('tokenが空です');
            }
        } else {
            setFormValues(initialValues);
        };
    }

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "input your user name";
        }
        if (!values.password) {
            errors.password = "input your password";
        };
        return errors;
    };

    // ページロード時に既存のトークンをチェック
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('T-lab_username');
        if (token) {
            getUserId(username).then(id => {
                if (id) {
                    console.log(`User ID is: ${id}`);
                    navigate('/dashboard/' + id.toString());
                }
            });
        }
    }, []);

    return (
        <>
            <div class="form-wrapper">
                <h1>Sign In</h1>
                <form>
                    <div class="form-item">
                        <label></label>
                        <input type="text" name="username" required="required" placeholder="UserName" value={formValues.username} onChange={(e) => handleChange(e)} ></input>
                    </div>
                    <div class="form-item">
                        <label></label>
                        <input type="password" name="password" required="required" placeholder="Password" value={formValues.password} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div class="button-panel">
                        <input type="submit" class="button" title="Sign In" value="Sign In" onClick={(e) => handleSubmit(e)}></input>
                    </div>
                </form>
                <div class="form-footer">
                    <p><a href="#">　</a></p>
                    <p><a href="#">　</a></p>
                </div>
            </div>
        </>
    );
};

export default Loginform;