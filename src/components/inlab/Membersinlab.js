import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Memberrootinlab from "./Memberrootinlab";
import { FaRegStar, FaHeart } from "react-icons/fa";

axios.defaults.headers.common["X-API-KEY"] = process.env.REACT_APP_API_KEY;

const Membersinlab = ({ baseurl, user_id }) => {
    // 全てのユーザー情報を取得し、リスト化する
    const [allmembersValues, setallmembersValues] = useState([]);
    const [counter, setCounter] = useState(true);
    const roomname = localStorage.getItem('T-Lab_roomname') || "";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalMemberName, setModalMemberName] = useState("");
    const shownMembersRef = useRef(new Set());
    const modalTimerRef = useRef(null);

    // 2026/03/31 23:59:59 まで有効
    const MESSAGE_DEADLINE = new Date("2026-03-31T23:59:59");

    // 名前ごとのメッセージ
    const memberMessages = {
        "Noriko Takemura": `武村先生へ
たつまです。
最後にどうしても感謝をお伝えしたくて、LabLinkを少しだけハックさせていただきました。

無事に卒業式を終え、研究室を離れることになりましたが、ここまで育ててくださり、本当にありがとうございました。

研究とは何かも分からなかった僕に、研究の面白さや楽しさを教えてくださったおかげで、今では心から研究が好きだと言えるようになりました。

これまでたくさんご迷惑をおかけしてしまいましたが、それでも温かく見守り、導いてくださったことに、感謝してもしきれません。

これからも、先生に教えていただいたことを大切にしながら、自分らしく、楽しく人生を歩んでいきたいと思います。本当に、今までありがとうございました。

先生の息子 古家龍磨 より
        `,
        "Shiori Furukawa": `しおりさんへ
先輩！！

たちゅまです。
今日もお疲れ様です。
どうしても感謝を伝えたくて、LabLinkをハックしちゃいました。

まずは、研究室に入ってからいろいろ失礼なことをしてしまったこと、ここでお詫びします（笑）

でもそんな僕と一緒に研究をしてくれて本当にありがとうございました。
なんだかんだ真面目で、なんだかんだ優秀なしおりさんと一緒に研究できて、めちゃくちゃ楽しかったし、最高の時間でした。

ドクターもあと２年ありますが、あまり気負いすぎず、やりたいと思ったことに素直に突き進んで、最高の研究ライフを送ってください。

ずっと応援しています！！

楽しいことばかりじゃないと思いますが、また一緒に頑張って乗り越えていきましょ！！

最後に日鉄エンジのバイトいっぱい入ってね！！

本当にありがとうございました。

たつまより
`,
        "Riku Yamamoto": `りっくんへ
たつまだよ！！
研究室に来たってことは、今日もやる気満々じゃん（笑）

まずは、こんなチャランボランなAIオタクと一緒に研究してくれて、本当にありがとう。

りっくんと研究できた時間は本当に楽しかったし、研究について色々話す中で気づけることも多くて、毎回「マジでリスペクトだな」って思ってました。

ドクターは不安なことも多いと思うし、落ち込むこともあるかもしれないけど、あんまり他人と比べすぎずにりっくんらしく進んでいってください。

ずっと応援してるからね！！

また、日鉄エンジのバイトに来てくれた時は、ご飯行っていっぱい語り合おう！！

たつまより
`,
        "Ryota Yabe": `やべっちへ
たつまです！！
感謝を伝えたくてLabLinkハッキング中です（笑）

まずは、今まで一緒に研究してくれてありがとう。飲み会とかでダル絡みしてもなんだかんだで乗ってくれるし、サイコーでした！！

もっとやべっちと将棋さしたかったけど、全然太刀打ちできる気がしなかったのでヒヨっていました。また、いつか太刀打ちできるように鍛え上げてボコボコにします笑

本当に今までありがとう。

たつまより
`,
        "Wataru Matsunaga": `マッチョへ
たつまだお。

感謝を伝えたくてLabLinkハッキング中です（笑）

まずは、今まで研究を一緒にしてくれてありがとう。ミーティングで毎週、めちゃくちゃ進捗を出してきてて、内心ずっと「すげーな...」って思ってました。

マチョナガは優秀で優しくて、しかもちゃんと面白くて、ほんとずっとサイコーなひとだなって思ってた。

失恋からマッチョへの進化はめちゃくちゃ面白かったけど、これからも筋トレみたいに夢中になれることを見つけて、どんどん突き進んでいってください。

マチョナガと北九州で一緒に美味しいお店開拓するの夢なので、いつか叶えてください（笑）

今まで本当にありがとう！！

たつまより
`,
        "Tomoki Yamaguchi": `ぐっさんへ
たつまだお。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、研究室で無茶おもろいものまでを見せてくれてありがとう！！
あれのおかげで、ちょっとだけ玉置を車で聞くようになりました（笑）

オーストラリアに行ったとき、色々調べてくれてすごい安心感があって本当に助かりました。
おかげでめちゃくちゃ楽しかったです！

あと一年、あっという間だと思うので、全力で研究室ライフを楽しんでください。

応援してます！！

今まで本当にありがとう！！

たつまより
`,
        "Saito Takase": `高瀬へ
たつまだお。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、２年間一緒に研究室ライフを過ごしてくれてありがとう！！

あとLTで大笑いを提供してくれてありがとう。ほんと毎回めちゃくちゃ笑わせてもらってました（笑）

正直、高瀬からもう少し下ネタを学びたかったです（笑）

また、機会があったら、いろんなことを教えてください、先生！！

たつまより
`,
        "Kaisei Noguchi": `野口へ
たつまだお。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、２年間一緒に研究室ライフを過ごしてくれてありがとう！！

野口と話してると、野口が発言するたびにツボに入っちゃって、毎回しんどかったです（笑）

でもそういうところも含めて、
自分の欲求にまっすぐなところとか、人として見習いたい部分が本当に多くて、マジでリスペクトしてます。

今まで出会った人の中でもトップクラスにおかしな人だけど同時にトップクラスにサイコーな人だと思ってます。

また、うまい店とかサウナいっぱい教えてください！

今まで本当にありがとう！！

たつまより
`,
        "Taro Ofuchi": `タローちゃんへ
たつまだお。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、２年間一緒に研究室ライフを過ごしてくれてありがとう！！

タローちゃんに話しかけるとどんな話題でも一緒に話してくれて、めちゃくちゃ楽しかったです。ミーティングでもすごく頼りになるし、その能力をこれからも磨き上げて行っちゃってください。

応援しています。

たつまより
`,
        "Aoi Koga": `あおちゃんへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、１年間、一緒に研究してくれてありがとう。

最初、椅子の強化学習のテーマを先生に伝えたとき、正直「これまとめるの難しいかも...」って思ってたんだけど、あおちゃんがめちゃくちゃ優秀だったおかげで、いい卒論になっていました。本当にありがとう。

ただでさえすごいのに、向上心もあって、自分磨きもすごくて、純粋に「かっこいいな」って思ってました（笑）

これから、研究がしんどくなったり、就活が嫌になったりすることもあるかもしれないけど、そのときはいつでも相談に乗るので、気軽に連絡してください（笑）

今まで本当にありがとう！！

たつまより
`,
        "Shingo Matsuoka": `しんちゃんへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、一年間、研究室ライフを一緒に歩んでくれてありがとう。

研究室にこれまでなかった新しいテーマで頑張っている姿をみて、いつも刺激をもらっていました。
僕自身も研究室にないテーマで研究を始めたからこそ、その大変さは少し分かるつもりなんだけど、それを乗り越えているのは本当にすごいなと思っています。

あと、スポーツ大会を主催してくれたり、研究室のみんなが楽しめるような企画をしてくれて、おかげで本当に楽しい研究室ライフになりました。ありがとう。

これからも、研究のことでもマッチングアプリのことでも何かあったらいつでも相談に乗るので、気軽に連絡してください（笑）

たつまより
`,
        "Manamu Kitajima": `じまくんへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、２年間、研究室ライフを一緒に歩んでくれてありがとう。

飲み会のときにダル絡みしちゃったけど、
それでも引かずに仲良くしてくれてありがとう！！

カラオケのときと普段のギャップが最高で、普通にキュン死しました（笑）

また一緒に飲んで、カラオケ行きましょう！！

今まで本当にありがとう！！

たつまより
`,

        "Momoka Makino": `ももちゃんへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、１年間、研究室ライフを一緒に過ごしてくれてありがとう。

ももちゃんと話すと、その明るさにいつも元気をもらえて、
こっちまで楽しくなれて、本当に最高でした。

優秀だし、発表も上手だし、一緒に話していて楽しいし、
本当にもう全部ひっくるめて最高です（笑）

でも、どこかで落ち込んだり悩んだりすることもあると思うから、そのときはいつでも相談に乗るので、気軽に連絡してください！

今まで本当にありがとう！！

`,
        "Syunta Kimura": `きむちへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、１年間、研究室ライフを一緒に過ごしてくれてありがとう。

この１年の中で、悩んだりしんどい時期もあったと思うけど、
最終的に卒論をしっかり仕上げて、無事に卒業までやり切ったのは本当にすごい！！

どこかで、きむちのことを勝手に自分に重ねてしまう部分もあったんだけど、
とりあえず、早寝早起きして、ちゃんと陽の光浴びて、美味しいものをたくさん食べて、健康でいれば、それだけで十分です。

だからそこだけは大事にして、どんなときも元気でいてください。

元気でいてくれたら、あとはもうなんでもOKです（笑）

また、悩むことでも嬉しい報告でも、何かあったらいつでも連絡してください。

今まで本当にありがとう！！

たつまより
`,
        "Hiroto Yamamoto": `ひろちゃんへ
たつまです。

感謝を伝えたくて、LabLinkハッキング中です（笑）

まずは、１年間、研究室ライフを一緒に過ごしてくれてありがとう。

飲み会のとき、ダル絡みしてごめん（笑）
それでもあたたかい目で受け止めてくれて、本当にありがとう！！

ひろちゃんは研究力が本当に高くて、研究の話を一緒にしていてもすごく楽しかったし、
これからどんどん成長していくんだろうなと思うと、ちょっと恐ろしいです（笑）

また一緒にご飯行こうね！！

今まで本当にありがとう！！

たつまより
`,
    };

    const getMessageByName = (name) => {
        return memberMessages[name] || `${name}さん、在室状態を更新しました。`;
    };

    const handleMemberClick = (name) => {
        const now = new Date();

        // 期限切れなら何もしない
        if (now > MESSAGE_DEADLINE) {
            return;
        }

        // このページ表示中に既に表示済みなら何もしない
        if (shownMembersRef.current.has(name)) {
            return;
        }
        if (modalTimerRef.current) {
            clearTimeout(modalTimerRef.current);
            modalTimerRef.current = null;
        }
        shownMembersRef.current.add(name);
        setModalMemberName(name);
        setModalMessage(getMessageByName(name));
        setIsModalOpen(true);

        modalTimerRef.current = setTimeout(() => {
            setIsModalOpen(false);
            modalTimerRef.current = null;
        }, 300000);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (modalTimerRef.current) {
            clearTimeout(modalTimerRef.current);
            modalTimerRef.current = null;
        }
    };
    
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        return () => {
            if (modalTimerRef.current) {
                clearTimeout(modalTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        async function fetchAllMembers() {
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => {
                    // IDで降順ソート
                    if (b.user_id_inroom !== a.user_id_inroom) {
                      return b.user_id_inroom - a.user_id_inroom;
                    }
                    // IDが同じなら名前のアルファベット順（昇順）
                    return a.name.localeCompare(b.name);
                  });
                setallmembersValues(res.data)
            }
        };
        fetchAllMembers();
    }, []);
    useEffect(() => {
        async function fetchAllMembers() {
            const res = await axios.get(`${baseurl}/user/room_members_from_roomname/${roomname}`);
            if (res.data && Array.isArray(res.data)) {
                res.data.sort((a, b) => {
                    // IDで降順ソート
                    if (b.user_id_inroom !== a.user_id_inroom) {
                      return b.user_id_inroom - a.user_id_inroom;
                    }
                    // IDが同じなら名前のアルファベット順（昇順）
                    return a.name.localeCompare(b.name);
                  });
                setallmembersValues(res.data)
            }
        };
        fetchAllMembers();
    }, [counter]);


    return (
        <>
            <div className="row">
                {allmembersValues.map((member, index) =>
                    <Memberrootinlab
                        key={index}
                        details={member}
                        baseurl={baseurl}
                        user_id={user_id}
                        counter={counter}
                        setCounter={setCounter}
                        onMemberClick={handleMemberClick}
                    />
                )}
            </div>

            {isModalOpen && (
                <>
                    <div
                        className="modal fade show special-message-modal"
                        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                        onClick={closeModal}
                    >
                        <div className="modal-dialog modal-dialog-centered special-message-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content special-message-content">
                                <div className="modal-header special-message-header">
                                    <h5 className="modal-title d-flex align-items-center">
                                        <FaRegStar className="mr-2" />
                                        Special Thanks
                                        <FaHeart className="ml-2" />
                                    </h5>
                                    <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body special-message-body">
                                    <div className="special-message-name">
                                        {modalMemberName} さんへ
                                    </div>
                                    <div className="special-message-text">
                                        {modalMessage}
                                    </div>
                                </div>
                                <div className="modal-footer special-message-footer">
                                    <button type="button" className="btn btn-primary special-message-close-btn" onClick={closeModal}>ありがとうございます！</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Membersinlab;