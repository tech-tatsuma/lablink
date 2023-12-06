import React from "react";

const Simplechatcontent = ({setmenu}) => {
    const chatbotlist = ["chatbot1", "chatbot2", "chatbot3", "chatbot4"]
    return (
        <div className="container">
            <div className="row">
                {chatbotlist.map((chatbot, index) => (
                    <div key={index} className="col-6" style={{ backgroundColor: "#fffacd" }}> {/* 柔らかい黄色の背景色 */}
                        <div className="p-3 border">
                            {chatbot}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Simplechatcontent;