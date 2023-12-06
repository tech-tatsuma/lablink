import React from "react";

const Simplechatcontent = ({ setmenu }) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"];

    const createchat = () => {
       
    }
    return (
        <div className="container my-3">
            <div className="row">
                <h3 className="text-center mb-4">Simple Chat</h3>
                <button type="button" className="btn btn-warning text-white" onClick={createchat}>Create Chat</button>
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-6 mb-3">
                        <div className="p-3 border shadow rounded" style={{ backgroundColor: "#f5f5f5" }}>
                            <p className="h2">{chatbot}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Simplechatcontent;
