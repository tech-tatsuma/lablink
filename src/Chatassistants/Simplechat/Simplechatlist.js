import React from "react";

const Simplechatcontent = ({ setmenu }) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"];

    const createchat = () => {
       
    }
    return (
        <div className="container my-3">
            <div className="row">
                <h3 className="text-center mb-4">Simple Chat</h3>
                <div className="d-flex justify-content-center mb-4"> 
                    <button type="button" className="btn btn-warning text-white" onClick={createchat}>Create Chat</button>
                </div>
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-md-6 col-12 mb-3">
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
