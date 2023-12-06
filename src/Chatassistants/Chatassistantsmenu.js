import React from "react";
import { useState } from 'react';
import Simplechatcontent from "./Simplechat/Simplechatlist";
import Chatwithdoccontent from "./Chatwithdoc/Chatwithdoclist";
import Imagegeneratorcontent from "./Imagegenerator/Imagegeneratorlist";

const Chatassistantsmenu = () => {
    const [simplechat, setsimplechat] = useState(false);
    const [chatwithdoc, setchatwithdoc] = useState(false);
    const [imagegenerator, setimagegenerator] = useState(false);
    const [menu, setmenu] = useState(true);

    const callSimpleChat = () => {
        setsimplechat(true);
        setchatwithdoc(false);
        setmenu(true);
        setimagegenerator(false);
    };

    const callChatWithDoc = () => {
        setsimplechat(false);
        setchatwithdoc(true);
        setmenu(true);
        setimagegenerator(false);
    };

    const callimagegenerator = () => {
        setsimplechat(false);
        setchatwithdoc(false);
        setmenu(true);
        setimagegenerator(true);
    };

    return (
        <>
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
            {simplechat && <Simplechatcontent setmenu={setmenu} />}
            {chatwithdoc && <Chatwithdoccontent setmenu={setmenu} />}
            {imagegenerator && <Imagegeneratorcontent setmenu={setmenu} />}
        </>
    );
}

export default Chatassistantsmenu;
