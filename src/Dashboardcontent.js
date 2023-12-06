import React from "react";
import Dashboardview from "./Dashboardview";
import Equipmentview from "./Equipmentview";
import Admin from "./Admin";
import Papersummarydashboard from "./PaperSummary/Papersummarydash";
import Papersearchcontent from "./Papersearch/Papersearchcontent";
import ChromeDinoGame from 'react-chrome-dino';
import ImageContent from "./Imagedescription/ImageContent";
import Chatassistantsmenu from "./Chatassistants/Chatassistantsmenu";

const Dashboardcontent = ({ isHome, isAdminView, isSummaryView, isSearchpaper, isplayground, user_id, baseurl, monthpay, isimagedescription, isAssistant }) => {
    if (isAssistant === false) {
        if (isimagedescription === false) {
            if (isplayground === false) {
                if (isSearchpaper === false) {
                    if (isSummaryView === false) {
                        if (isAdminView === false) {
                            if (isHome === true) {
                                return (
                                    <>
                                        <Dashboardview user_id={user_id} baseurl={baseurl} />
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <Equipmentview user_id={user_id} baseurl={baseurl} monthpay={monthpay} />
                                    </>
                                );
                            }
                        } else {
                            return (
                                <>
                                    <Admin baseurl={baseurl} monthpay={monthpay} />
                                </>
                            );
                        }
                    } else {
                        return (
                            <>
                                <Papersummarydashboard />
                            </>
                        );
                    }
                } else {
                    return (
                        <>
                            <Papersearchcontent />
                        </>
                    );
                }
            } else {
                return (
                    <>
                        <div className="alert alert-info" role="alert">
                            <h4 className="alert-heading">走る恐竜ちゃん</h4>
                            <p>
                                PC：キーボードの上矢印ボタンを押すと恐竜ちゃんが走り出します。ジャンプも上矢印です。<br />
                                スマホ：恐竜ちゃんをタップすると恐竜ちゃんが走り出します。ジャンプも画面タップです。画面は横向きにした方がプレーしやすいです。<br />
                                <br />
                                恐竜ちゃんが走り出したらタイミングよくジャンプして障害物を避けましょう。たまにはこんなゲームで息抜きしちゃお！！
                            </p>
                        </div>
                        <ChromeDinoGame />
                    </>
                );
            }
        } else {
            return (
                <>
                    <ImageContent />
                </>
            );
        }
    } else {
        return (
            <>
            <Chatassistantsmenu />
            </>
        )
    }
};

export default Dashboardcontent;
