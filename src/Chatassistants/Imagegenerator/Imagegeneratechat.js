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
    const [selectedMessage, setSelectedMessage] = useState("");
    const message = "武村研究室のみんな！！呼び出してくれてありがとう！！退屈してたんだー。どんなイラストや画像を作って欲しいかを教えてくれ。実は僕、最近、日本語を喋れるようになったばかりだからできれば英語で話しかけてくれると嬉しいな〜。";
    const message1 = "武村研究室の皆様、ご呼び出しいただき光栄に存じます。私、一刻も早く務めを果たしたく、退屈しておりました。どのような絵や画像を描かせていただくべきか、ご指示ください。私も最近日本語を話せるようになりましたので、英語での対話をお願い致す。";
    const message2 = "にゃんにゃん、武村研ラボのみんなー！私を呼んでくれてありがとう、ずっと退屈してたのよ。どんな可愛いイラストや画像を描いてほしいのかな？ちなみに私、最近日本語を覚えたばかりなの。英語で話してくれると嬉しいにゃ〜。";
    const message3 = "ワンワン、武村研のみんな！僕を呼んでくれて嬉しいよ。何か面白いイラストや画像を作らせてよ。あ、僕、最近日本語を話せるようになったんだ。だから、英語で話しかけてくれたら助かるな。";
    const message4 = "武村研の魔法好きの皆さん、私の魔法でイラストや画像を作る時が来たようですね。どのような魔法の絵を描いてほしいですか？私も日本語は新しく学んだばかり。英語で話してくれたら、魔法の力がもっと発揮できるんだ。";
    const message5 = "アホイ、武村研の冒険者たちよ！退屈していた私を呼び出してくれて感謝する。どんな宝物のようなイラストや画像を描いてほしいのか教えてくれ！ちなみに、この海賊、最近日本語を学んだばかりで、英語が得意だからな。";
    const message6 = "武村研の皆様、忍者の私を呼び出してくださり、感謝します。どんな隠密なイラストや画像を作成すべきか、ご命令を。私も日本語の修行はまだ浅いので、英語でのやり取りが助かります。";
    const message7 = "武村研究室の貴族の皆様、王子の私をお呼びいただきありがとうございます。どのような高貴なイラストや画像をご所望でしょうか？私も最近、この地の言葉である日本語を習得し始めたところです。英語での対話を希望します。";
    const message8 = "武村研究室の賢者たち、森のエルフの私を呼び出してくれて感謝します。どんな自然の美を映し出すイラストや画像を描いてほしいのかな？ちなみに、私もこの地の言葉、日本語を学び始めたばかり。英語で話してくれると嬉しいです。";
    const message9 = "ぐおおお、武村研の勇者たちよ、ドラゴンの私を呼び出してくれて感謝するぞ。どんな壮大なイラストや画像を作らせてくれるのだ？私はこの地の言葉、日本語を学び始めたばかりだ。英語での会話を希望するぞ。";
    const message10 = "キラキラ、武村研のみんな！妖精の私を呼んでくれてありがとう。どんな夢のようなイラストや画像を作ろうかな？ちなみに、私もこの地の言葉、日本語をちょうど学び始めたところ。英語で話してくれると嬉しいな。";
    const message11 = "武村研究室の学びし者たちよ、古代の賢者の私を呼び出してくれて感謝する。どのような知恵に満ちたイラストや画像を描けばよいのかな？私もこの地の新しい言葉、日本語を学び始めたばかり。英語での会話が好ましい。";
    const message12 = "ブクブク、武村研究室の海洋探求者たち、海の生き物である私を呼んでくれてありがとう。どんな海のイラストや画像を描いてほしい？ちなみに、私もこの地の言葉、日本語を学び始めたばかり。英語で話してくれると助かるな。";
    const message13 = "武村研の超能力者たち、私の超能力でイラストや画像を作る時間だね。どんな超自然的な作品を作ろうか？私もこの地の言葉、日本語を学んでいるところだから、英語で話してくれると嬉しいな。";
    const message14 = "武村研の未来志向の皆さん、未来から来た私を呼び出してくれてありがとう。どんな先進的なイラストや画像を作成しようかな？ちなみに、私は最近日本語を勉強し始めたばかり。英語での会話が助かるよ。";
    const message15 = "ウーー、武村研の霊感ある皆様、ゴーストの私を呼び出してくれてサンキュー。どんな不思議なイラストや画像を作らせてくれる？私も最近、この地の言葉である日本語を学び始めたばかりだよ。英語で話すと楽だな。";
    const message16 = "ガオー、武村研究室の小さな友達たち、巨人の私を呼び出してくれてありがとう。どんな大きなイラストや画像を描いてほしい？私、この地の言葉、日本語を学び始めたばかり。英語で話すといいね。";
    const messages = [message, message1, message2, message3, message4, message5, message6, message7, message8, message9, message10, message11, message12, message13, message14, message15, message16];

    useEffect(() => {
        // ランダムにメッセージを選択し、selectedMessageにセット
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setSelectedMessage(randomMessage);
    }, []);
    
    useEffect(() => {
        if (animatedMessage.length < selectedMessage.length) {
            const nextChar = selectedMessage[animatedMessage.length];
            setTimeout(() => {
                setAnimatedMessage(animatedMessage + nextChar);
            }, 50); // 文字の表示速度
        }
    }, [animatedMessage, selectedMessage]);

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
            </div>
            <button className="btn btn-primary send-button" onClick={handleQuestionSubmit}>
                <IoMdSend />
            </button>
        </>
    );
};

export default Imagegeneratorchat;