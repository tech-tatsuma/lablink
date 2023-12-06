import React from "react";

const Chatwithdoccontent = ({setmenu}) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"]
    return (
        <div className="container">
            <div className="row">
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-6">
                        <div className="p-3 border shadow" style={{ backgroundColor: "#f5f5f5" }}>
                            <p className="lead">{chatbot}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chatwithdoccontent;