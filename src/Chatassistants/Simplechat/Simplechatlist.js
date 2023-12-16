import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import CreateChatContent from "./CreateChatContent";
import ChatBotContent from "./ChatBotContent";

import "./chatbot.css";

const Simplechatcontent = ({ setmenu, baseurl, menu, setLoading, setshowfooter }) => {

    // 最大表示数と現在のページの状態
    const [currentPage, setCurrentPage] = useState(1);
    const maxItemsPerPage = 20;

    const formatUsername = (name) => {
        return name.replace(/\s/g, '').toLowerCase();
    };

    // ユーザーネームの取得
    let username = formatUsername(localStorage.getItem('T-lab_username') || '');
    // publicのチャットを表示するかどうかのフラグ
    const [publicflag, setPublicflag] = useState(true);
    // プライベートのチャットを格納する変数
    const [privatechat, setPrivatechat] = useState([]);
    // パブリックのチャットを格納する変数
    const [publicchat, setPublicchat] = useState([]);
    // 選択されているチャットボットの情報を格納する変数
    const [selectedChat, setSelectedChat] = useState(null);
    // チャット作成画面を表示するかどうかを決定する変数
    const [showCreateChat, setShowCreateChat] = useState(false);
    // チャット画面を表示するかどうかを決定する変数
    const [showchatbot, setShowchatbot] = useState(false);

    // ページの読み込み時に実行
    useEffect(() => {
        if (showCreateChat || showchatbot) {
            setshowfooter(false);
        } else {
            setshowfooter(true);
        }
        // パブリックチャットとプライベートチャットの取得
        const fetchChats = async () => {
            setLoading(true);
            try {
                console.log(`${baseurl}simplechat/get_public_chats`)
                const publicResponse = await axios.get(`${baseurl}simplechat/get_public_chats`);
                setPublicchat(publicResponse.data.public_chats);
                const privateResponse = await axios.get(`${baseurl}simplechat/get_private_chats`, { params: { user: formatUsername(username) } });
                setPrivatechat(privateResponse.data.private_chats);
            } catch (error) {
                console.error("Chats fetching error:", error);
            }
            setLoading(false);
        };
        fetchChats();
    }, [showCreateChat, showchatbot, menu, publicflag]);

    useEffect(() => {
        // パブリックチャットとプライベートチャットの取得
        const fetchChats = async () => {
            // ladingをtrueにし、非同期処理を開始
            setLoading(true);
            try {
                // パブリックチャットの取得
                const publicResponse = await axios.get(`${baseurl}simplechat/get_public_chats`);
                console.log('public'+publicResponse.data.public_chats);
                setPublicchat(publicResponse.data.public_chats);
                // プライベートチャットの取得
                const privateResponse = await axios.get(`${baseurl}simplechat/get_private_chats`, { params: { user: formatUsername(username) } });
                console.log('private: '+privateResponse.data.private_chats);
                setPrivatechat(privateResponse.data.private_chats);
            } catch (error) {
                console.error("Chats fetching error:", error);
            }
            // loadingをfalseにし、非同期処理を終了
            setLoading(false);
        };
        fetchChats();
    }, []);

    const paginate = (items) => {
        const startIndex = (currentPage - 1) * maxItemsPerPage;
        return items.slice(startIndex, startIndex + maxItemsPerPage);
    };

    const totalPages = Math.ceil(publicchat.length / maxItemsPerPage);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button key={i} onClick={() => setCurrentPage(i)}>
                    {i}
                </button>
            );
        }
        return <div>{pages}</div>;
    };

    // チャットボットを選択した時に実行
    const selectChat = (chat) => {
        // 選択されたチャットをselectedChatに格納
        setSelectedChat(chat);
        // チャット作成画面を非表示
        setShowCreateChat(false);
        // チャット画面を表示
        setShowchatbot(true);
        // メニューを非表示
        setmenu(false);
    };

    // assistant_nameから#@以降を除去する関数
    const formatAssistantName = (name) => {
        console.log('name'+name);
        if (!name || typeof name !== 'string') {
            return ''; // 無効な値が渡された場合は空文字列を返す
        }
        const atIndex = name.indexOf('#@');
        return atIndex !== -1 ? name.substring(0, atIndex) : name;
    };

    // パブリックかどうかのフラグを切り替える関数
    const toggleChatVisibility = () => {
        setPublicflag(!publicflag);
    };

    // チャット作成画面を表示する関数
    const createchat = () => {
        setmenu(false);
        setShowCreateChat(true);
        setShowchatbot(false);
    }
    
    // チャット作成画面を表示する変数
    if (showCreateChat) {
        return <CreateChatContent baseurl={baseurl} setShowCreateChat={setShowCreateChat} setmenu={setmenu} setShowchatbot={setShowchatbot} showchatbot={showchatbot} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />;
    }

    // チャット画面を表示する変数
    if (showchatbot) {
        return <ChatBotContent baseurl={baseurl} threadid={selectedChat.threadid} assistantid={selectedChat.assistantid} assistantname={selectedChat.chatname} model={selectedChat.model} setShowchatbot={setShowchatbot} setShowCreateChat={setShowCreateChat} setmenu={setmenu} />;
    }

    return (
        <>
        <div className="container my-3">
            <div className="row">
                <h3 className="text-center mb-4">Simple Chat</h3>
                <div className="d-flex justify-content-center mb-4"> 
                {/* パブリックかどうかのフラグを切り替えるボタン */}
                    <button type="button" className="btn btn-warning text-white" onClick={toggleChatVisibility}>
                        {publicflag ? "Show Private Chats" : "Show Public Chats"}
                    </button>
                </div>
                <div className="d-flex justify-content-center mb-4"> 
                    <button type="button" className="btn btn-primary text-white" onClick={createchat}>Create Chat</button>
                </div>
                {/* パブリックフラグで表示するチャットを切り替える */}
                {publicflag ? (
                    paginate(publicchat).map((chat, index) => (
                        <div key={index} className="col-md-6 col-12 mb-3" onClick={() => selectChat(chat)}>
                            <div className="p-3 border shadow rounded" style={{ backgroundColor: "#f5f5f5" }}>
                                <p className="chattitle">{chat.chatname}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    paginate(privatechat).map((chat, index) => (
                        <div key={index} className="col-md-6 col-12 mb-3" onClick={() => selectChat(chat)}>
                            <div className="p-3 border shadow rounded" style={{ backgroundColor: "#f5f5f5" }}>
                                <p className="chattitle">{formatAssistantName(chat.chatname)}</p>
                            </div>
                        </div>
                    ))
                )}
                {renderPagination()}
            </div>
        </div>
        </>
    );
}

export default Simplechatcontent;