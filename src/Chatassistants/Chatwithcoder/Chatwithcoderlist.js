import React from "react";

const Chatwithcodercontent = ({setmenu}) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"]

    return (
        <div className="container">
            <div className="row">
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-6" style={{ backgroundColor: "#87cefa" }}> 
                        <div className="p-3 border">
                            {chatbot}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chatwithcodercontent;