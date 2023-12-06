import React from "react";

const Chatwithdoccontent = () => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"]
    return (
        <div className="container">
            <div className="row">
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-6" style={{ backgroundColor: "#ff7f50" }}> 
                        <div className="p-3 border">
                            {chatbot}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chatwithdoccontent;