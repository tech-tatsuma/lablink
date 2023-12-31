import React from "react";

// 掲示板の中の投稿一つ一つの表示を行うコンポーネント
const Information = ({ details, setisdetailvalue, setdetailevalue }) => {
    const switchisdetailvalue = () => {
        let detail = { 'id': details.id, 'title': details.title, 'content': details.content, 'url': details.url, 'created_at': details.created_at, 'created_by': details.created_by };
        setdetailevalue(detail);
        setisdetailvalue(true);
    };
    return (
        <>
        <div className="py-2 border-bottom">
            <p className="infolist text-dark"><a onClick={switchisdetailvalue}>{details.title}</a></p>
            </div>
        </>
    );
}

export default Information;