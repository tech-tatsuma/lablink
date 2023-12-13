import React from "react";
import { useState } from 'react';
import Simplechatcontent from "./Simplechat/Simplechatlist";
import Chatwithdoccontent from "./Chatwithdoc/Chatwithdoclist";
import Imagegeneratorcontent from "./Imagegenerator/Imagegeneratorlist";

const Chatassistantsmenu = () => {
    // バックエンドのベースURL
    let baseurl = 'https://dry-dawn-729.fly.dev/';
    // 表示するチャットを制御する変数
    const [simplechat, setsimplechat] = useState(false);
    const [chatwithdoc, setchatwithdoc] = useState(false);
    const [imagegenerator, setimagegenerator] = useState(false);
    // メニューバーを表示するかどうかを制御する変数
    const [menu, setmenu] = useState(true);

    // Simple Chatを呼び出す関数
    const callSimpleChat = () => {
        setsimplechat(true);
        setchatwithdoc(false);
        setmenu(true);
        setimagegenerator(false);
    };

    // ChatWithDocを呼び出す関数
    const callChatWithDoc = () => {
        setsimplechat(false);
        setchatwithdoc(true);
        setmenu(true);
        setimagegenerator(false);
    };

    // Image Generatorを呼び出す関数
    const callimagegenerator = () => {
        setsimplechat(false);
        setchatwithdoc(false);
        setmenu(true);
        setimagegenerator(true);
    };

    return (
        <>
        {/* menuがtrueの時のみに表示される */}
            {menu && (
                <>
                    <h1 className="text-center">Chat Assistants Menu</h1>
                    <p className="text-center">いろんなチャットボットがあなたを助けてくれます。どのチャットボットくんを呼び出しますか？</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button type="button" className="btn btn-warning text-white" onClick={callSimpleChat}>Simple Chat</button>
                        <button type="button" className="btn btn-danger text-white" onClick={callChatWithDoc}>Chat with Doc</button>
                        <button type="button" className="btn btn-primary text-white" onClick={callimagegenerator}>Image Generator</button>
                    </div>
                </>
            )}
            {simplechat && <Simplechatcontent setmenu={setmenu} baseurl={baseurl} menu={menu} />}
            {chatwithdoc && <Chatwithdoccontent setmenu={setmenu} baseurl={baseurl} />}
            {imagegenerator && <Imagegeneratorcontent setmenu={setmenu} baseurl={baseurl} />}
        </>
    );
}

export default Chatassistantsmenu;
