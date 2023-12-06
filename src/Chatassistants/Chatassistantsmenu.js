import React from "react";
import { useState } from 'react';
import Simplechatcontent from "./Simplechat/Simplechatlist";
import Chatwithdoccontent from "./Chatwithdoc/Chatwithdoclist";
import Chatwithcodercontent from "./Chatwithcoder/Chatwithcoderlist";

const Chatassistantsmenu = () => {
    const [simplechat, setsimplechat] = useState(false);
    const [chatwithdoc, setchatwithdoc] = useState(false);
    const [chatwithcoder, setchatwithcoder] = useState(false);
    const [menu, setmenu] = useState(true);

    const callSimpleChat = () => {
        setsimplechat(true);
        setchatwithdoc(false);
        setmenu(true);
        setchatwithcoder(false);
    };

    const callChatWithDoc = () => {
        setsimplechat(false);
        setchatwithdoc(true);
        setmenu(true);
        setchatwithcoder(false);
    };

    const callChatWithCoder = () => {
        setsimplechat(false);
        setchatwithdoc(false);
        setmenu(true);
        setchatwithcoder(true);
    };

    return (
        <>
            {menu && (
                <>
                    <h1>Chat Assistants Menu</h1>
                    <p>いろんなチャットボットがあなたを助けてくれます。どのチャットボットくんを呼び出しますか？</p>
                    <div className="btn-group" role="group" aria-label="Chat options">
                        <button type="button" className="btn btn-warning text-white" onClick={callSimpleChat}>Simple Chat</button>
                        <button type="button" className="btn btn-danger text-white" onClick={callChatWithDoc}>Chat with Doc</button>
                        <button type="button" className="btn btn-primary text-white" onClick={callChatWithCoder}>Chat with Coder</button>
                    </div>
                </>
            )}
            {simplechat && <Simplechatcontent setmenu={setmenu} />}
            {chatwithdoc && <Chatwithdoccontent setmenu={setmenu} />}
            {chatwithcoder && <Chatwithcodercontent setmenu={setmenu} />}
        </>
    );
}

export default Chatassistantsmenu;
