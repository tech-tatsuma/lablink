import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { FaRobot } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import "./chatbot.css";

import "./../../PaperSummary/Papsum.css";

const ChatBotContent = ({ baseurl, threadid, assistantid, assistantname, model, setShowCreateChat, setShowchatbot, setmenu }) => {
    // 質問内容を格納する変数
    const [question, setQuestion] = useState('');
    // チャットとの会話履歴を格納する変数
    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    // 履歴の順序を調整する関数
    const rearrangeHistory = (messages) => {
        if (messages.length < 2) return messages;
        let newOrder = [];
        // 最初のユーザーの質問を探す
        const userQuestion = messages.find(message => message.user);
        if (userQuestion) newOrder.push(userQuestion);
        // その他のメッセージを追加
        newOrder = newOrder.concat(messages.filter(message => !message.user));
        return newOrder;
    };

    // threadidとassistantidから情報を取得する関数
    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${baseurl}simplechat/get_messages`, {
                params: { assistantID: assistantid, threadID: threadid }
            });
            setHistory(rearrangeHistory(response.data.messages));
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    // assistant_nameから#@以降を除去する関数
    const formatAssistantName = (name) => {
        const atIndex = name.indexOf('#@');
        return atIndex !== -1 ? name.substring(0, atIndex) : name;
    };

    // ページの読み込み時に実行
    useEffect(() => {
        fetchHistory();
    }, []);

    // 質問を送信する関数
    const handleQuestionSubmit = async () => {
        setLoading(true);
        if (!question) return;  // 質問が空の場合は処理を行わない
        try {
            // chatbotへの質問を送信
            const response = await axios.post(`${baseurl}simplechat/ask_simplechat`, {
                assistantID: String(assistantid),
                threadID: String(threadid),
                question: String(question)
            });
            // chatbotからレスポンスが取れた場合
            if (response.data.messages) {
                setHistory(response.data.messages);
            } else if (response.data.error) { //エラー処理
                console.error('Error:', response.data.error);
            }
            // 質問を空にする
            setQuestion(''); 
        } catch (error) {
            console.error('Failed to send question:', error);
        }
        setLoading(false);
    };

    // メニューに戻る関数
    const handleBackToMenu = () => {
        setShowchatbot(false);
        setmenu(true);
        setShowCreateChat(false);
    };

    return (
        <>
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <IoIosMenu className="menu-icon" onClick={() => setShowInfo(!showInfo)} />

                    { showInfo && (
                        <>
                            <button 
                                className="btn btn-secondary mb-3" 
                                onClick={handleBackToMenu}
                                style={{ marginBottom: "15px" }}
                            >
                                Back to Menu
                            </button>
                            <h2>{formatAssistantName(assistantname)}</h2>
                            <p>{model}</p>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Conversation History</label>
                        <div className="p-3 border messages-display">
                            {loading ? (
                                <div className="assistant-message message-bubble">
                                    <div className="loading-animation"></div>
                                </div>
                            ) : (
                                history.map((entry, index) => (
                                    <div key={index} className={entry.user ? "user-message message-bubble" : "assistant-message message-bubble"}>
                                        {entry.user ? <FaUserAlt className="message-icon" /> : <FaRobot className="message-icon" />}
                                        <ReactMarkdown>{entry.user || entry.assistant}</ReactMarkdown>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="message-input p-3 border-top">
                        <textarea 
                            className="form-control" 
                            id="questionInput" 
                            rows="3"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        ></textarea>
                        <button className="btn btn-primary mt-2" onClick={handleQuestionSubmit}>
                            <IoMdSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ChatBotContent;