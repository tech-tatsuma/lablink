import React from "react";

const Imagegeneratorcontent = ({ setmenu }) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"]

    const createchat = () => {
        // チャット作成のロジック
    }

    return (
        <div className="container my-3">
            <div className="row">
                <h3 className="text-center mb-4">Image Generator</h3>
                <div className="d-flex justify-content-center mb-4"> 
                    <button type="button" className="btn btn-primary text-white" onClick={createchat}>Create Chat</button>
                </div>
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

export default Imagegeneratorcontent;
