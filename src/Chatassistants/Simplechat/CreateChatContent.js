import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatBotContent from "./ChatBotContent";

const CreateChatContent = ({baseurl, setShowCreateChat, setmenu, setShowchatbot, showchatbot, selectedChat, setSelectedChat}) => {
    const formatUsername = (name) => {
        return name.replace(/\s/g, '').toLowerCase();
    };
    // チャット名を格納する変数
    const [chatname, setChatName] = useState("");
    // instructionsを格納する変数
    const [instructions, setInstructions] = useState("");
    // ユーザーネームの設定
    let username = formatUsername(localStorage.getItem('T-lab_username') || '');
    // gptversionを格納する変数
    const [gptVersion, setGptVersion] = useState("");
    // チャットの公開範囲を格納する変数
    const [chatVisibility, setChatVisibility] = useState(true);
    // スレッドIDを格納する変数
    const [threadID, setThreadID] = useState("");
    // アシスタントIDを格納する変数
    const [assistantID, setAssistantID] = useState("");
    // チャットが作成されたかどうかを格納する変数
    const [isChatCreated, setIsChatCreated] = useState(false);

    // フォームが送信された時に実行
    const handleSubmit = async (event) => {
        event.preventDefault();

        // APIリクエストデータの構築
        const requestData = {
            instruction: String(instructions),
            name: String(chatname),
            tools: "",
            model: gptVersion === "gpt3" ? "gpt-3.5-turbo" : "gpt-4",
            public: chatVisibility,
            user: String(username)
        };

        console.log(requestData);

        try {
            // APIにリクエストを送信
            const response = await axios.post(`${baseurl}simplechat/create_simplechat`, requestData);
            if (response.data.error) {
                alert('Error: ' + response.data.error);
            } else { // リクエストが成功
                console.log(response.data);
                const newSelectedChat = {
                    thread_id: response.data.threadID,
                    assistant_id: response.data.assistantID,
                    assistant_name: response.data.assistantName, 
                    model: response.data.model 
                };
                setSelectedChat(newSelectedChat);
                // 取得した情報を状態変数に格納
                setThreadID(response.data.threadID);
                setAssistantID(response.data.assistantID);
                // チャット画面を表示
                setShowCreateChat(false);
                setShowchatbot(true);
                setmenu(false);
            }
        } catch (error) {
            console.error('API request failed:', error);
            alert('Failed to create chat.');
        }
    };

    useEffect(() => {
        // チャットが作成された場合
        if (selectedChat) {
            // チャットの作成処理が完了したフラグを立てる
            setIsChatCreated(true);
        }
    }, [selectedChat]);

    const backtomenu = () => {
        setShowCreateChat(false);
        setShowchatbot(false);
        setmenu(true);
    }

    if (isChatCreated) {
        return <ChatBotContent baseurl={baseurl} threadid={selectedChat.threadid} assistantid={selectedChat.assistantid} assistantname={selectedChat.chatname} model={selectedChat.gpttype} setShowchatbot={setShowchatbot} setShowCreateChat={setShowCreateChat} setmenu={setmenu} created_at={selectedChat.created_at} />;
    }

    // チャット作成画面を表示
    if (!isChatCreated) {
        return (
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center mb-4">Create a New Chat</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="chatName" className="form-label">Chat Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="chatName" 
                                    placeholder="Enter chat name" 
                                    value={chatname}
                                    onChange={(e) => setChatName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="chatInstructions" className="form-label">Instructions</label>
                                <textarea 
                                    className="form-control" 
                                    id="chatInstructions" 
                                    rows="3" 
                                    placeholder="Enter instructions for the chat"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                ></textarea>
                            </div>
                            <fieldset className="mb-3">
                                <legend>GPT Version</legend>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="gptVersion" 
                                        id="gpt3" 
                                        value="gpt3" 
                                        onChange={(e) => setGptVersion(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="gpt3">
                                        GPT-3.5
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="gptVersion" 
                                        id="gpt4" 
                                        value="gpt4" 
                                        onChange={(e) => setGptVersion(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="gpt4">
                                        GPT-4
                                    </label>
                                </div>
                            </fieldset>
                            <fieldset className="mb-4">
                                <legend>Chat Visibility</legend>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="chatVisibility" 
                                        id="private" 
                                        value="private"
                                        onChange={() => setChatVisibility(false)}
                                        checked={!chatVisibility}
                                    />
                                    <label className="form-check-label" htmlFor="private">
                                        Private
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="chatVisibility" 
                                        id="public" 
                                        value="public"
                                        onChange={() => setChatVisibility(true)}
                                        checked={chatVisibility}
                                    />
                                    <label className="form-check-label" htmlFor="public">
                                        Public
                                    </label>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-primary">Create Chat</button>
                        </form>
                        <button className="btn btn-secondary mt-3" onClick={backtomenu}>Back to Menu</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateChatContent;