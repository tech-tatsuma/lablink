import React from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import "./Imagegen.css";
import axios from "axios";
import './../../PaperSummary/Papsum.css';
import "./../Simplechat/chatbot.css";
import { BsEmojiSunglasses } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';

const Imagegeneratorchat = ({ setmenu, baseurl, setShowchatbot }) => {
    const [loading, setloading] = useState(false);
    const [question, setQuestion] = useState("");
    const [numImages, setNumImages] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [animatedMessage, setAnimatedMessage] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const message = "武村研のみんな！！\n今日も呼び出してくれてありがとう！！退屈してたんだー. どんなイラストや画像を作って欲しいかを教えてくれ. \n実は僕, 最近, 日本語喋れるようになったからできれば英語で話しかけてくれるとありがたいな";

    const handleQuestionSubmit = async () => {
        setloading(true);
        // ファイルが選択されていない場合
        try {
            const response = await axios.post(`${baseurl}imageprocess/generate`, {
                prompt: question,
                num_images: numImages,
            });

            console.log(response);

            if (response.status === 200) {
                setGeneratedImages(response.data);
            } else {
                console.error("Failed to generate image");
            }
        } catch (error) {
            console.error("Error generating images:", error);
        }
        setloading(false);
    };

    useEffect(() => {
        if (messageIndex < message.length) {
            setTimeout(() => {
                setAnimatedMessage(animatedMessage + message[messageIndex]);
                setMessageIndex(messageIndex + 1);
            }, 50); // ここで文字の表示速度を調整できます
        }
    }, [messageIndex, animatedMessage]);

    const backtomenu = () => {
        setShowchatbot(false);
        setmenu(true);
    }

    return (
        <>
        { loading && 
                <div className="overlay" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="my-container">
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>お絵描き中</p>
                </div>
            </div> 
            }
            <div className="back-to-menu">
                <button className="btn btn-secondary" onClick={backtomenu}>
                    Back to Menu
                </button>
            </div>
            <div className="p-3 messages-display">
                <div className="assistant-message message-bubble">
                    <BsEmojiSunglasses className="message-icon" />
                    <ReactMarkdown>{animatedMessage}</ReactMarkdown>
                </div>
            </div>
            <div className="images-display">
                {generatedImages.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={`Generated ${index}`} />
                        <a href={image.url} download={`generated_image${index + 1}.png`}>
                            Download Image {index + 1}
                        </a>
                        <p>{image.revised_prompt}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <textarea
                    className="form-control"
                    id="questionInput"
                    rows="1"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                {/* <input
                    type="number"
                    className="form-control num-images-input"
                    value={numImages}
                    onChange={(e) => setNumImages(e.target.value)}
                    min="1"
                    max="5"
                /> */}
            </div>
            <button className="btn btn-primary send-button" onClick={handleQuestionSubmit}>
                <IoMdSend />
            </button>
        </>
    );
};

export default Imagegeneratorchat;