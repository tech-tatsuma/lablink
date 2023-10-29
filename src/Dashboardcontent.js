// 何のページを呼び出すかを管理するファイル
import React from "react";
import Dashboardview from "./Dashboardview";
import Equipmentview from "./Equipmentview";
import Admin from "./Admin";
import Papersummarydashboard from "./PaperSummary/Papersummarydash";

const Dashboardcontent = ({ isHome, isAdminView, isSummaryView, isSearchpaper, user_id, baseurl, monthpay }) => {
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
        </>
    )
}
};

export default Dashboardcontent;