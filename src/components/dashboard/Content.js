import React from "react";
import Dashboardview from "./Dashboardview";
import Equipmentview from "./../equipments/Equipmentview";
import Admin from "./../admins/Admin";
import ChromeDinoGame from "react-chrome-dino";

const Content = ({
    isHome,
    isAdminView,
    isplayground,
    user_id,
    baseurl,
    monthpay,
}) => {
    // ゲーム画面を選択している場合
    if (isplayground) {
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
    
    // 管理者画面を選択している場合
    if (isAdminView) {
        return <Admin baseurl={baseurl} monthpay={monthpay} />;
    }
    
    // ダッシュボードを選択している場合
    if (isHome) {
        return <Dashboardview user_id={user_id} baseurl={baseurl} />;
    }
    
    // 備品画面を選択している場合
    return <Equipmentview user_id={user_id} baseurl={baseurl} monthpay={monthpay} />;
};

export default Content;
