// 何のページを呼び出すかを管理するファイル
import React from "react";
import Dashboardview from "./Dashboardview";
import Equipmentview from "./Equipmentview";
import Admin from "./Admin";
import Papersummarydashboard from "./PaperSummary/Papersummarydash";
import Papersearchcontent from "./Papersearch/Papersearchcontent";
import ChromeDinoGame from 'react-chrome-dino';
import Tetriscontent from "./Games/Tetris";

const Dashboardcontent = ({ isHome, isAdminView, isSummaryView, isSearchpaper, isplayground, istetris, user_id, baseurl, monthpay }) => {
    if (istetris === false){
    if (isplayground === false){
    if (isSearchpaper === false){
    if (isSummaryView === false){
        if (isAdminView === false) {
            // もし受け取ったisHomeの値によって呼び出す関数を変更させる
            if (isHome === true) {
                return (
                    <>
                        {/* ホーム画面の呼び出しを行う */}
                        <Dashboardview user_id={user_id} baseurl={baseurl} />
                    </>
                );
            } else {
                return (
                    <>
                        {/* 備品管理画面の呼び出しを行う */}
                        <Equipmentview user_id={user_id} baseurl={baseurl} monthpay={monthpay} />
                    </>
                );
            }
        } else {
            return (
                <>
                    {/* 管理者画面の呼び出しを行う */}
                    <Admin baseurl={baseurl} monthpay={monthpay} />
                </>
            );
        }
    } else {
        return (
        <>
            {/* 論文要約画面の呼び出しを行う */}
            <Papersummarydashboard />
        </>
        );
    }
} else {
    return (
        <>
        <Papersearchcontent />
        </>
    )
}
    } else {
        return (
            <>
                {/* Bootstrapを使用したメッセージ表示部分 */}
                <div className="alert alert-info" role="alert">
                    <h4 className="alert-heading">走る恐竜ちゃん</h4>
                    <p>
                           PC：キーボードの上矢印ボタンを押すと恐竜ちゃんが走り出します。ジャンプも上矢印です。<br />
                        スマホ：恐竜ちゃんをタップすると恐竜ちゃんが走り出します。ジャンプも画面タップです。画面は横向きにした方がプレーしやすいです。<br />
                        <br />
                        恐竜ちゃんが走り出したらタイミングよくジャンプして障害物を避けましょう。たまにはこんなゲームで息抜きしちゃお！！
                    </p>
                </div>

                {/* ChromeDinoGameの呼び出し */}
                <ChromeDinoGame />
            </>
        )
    }
} else {
    return(
        <>
        <Tetriscontent />
        </>
    )
}
};

export default Dashboardcontent;