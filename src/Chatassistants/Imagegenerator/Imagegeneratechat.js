import React from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import "./Imagegen.css";
import axios from "axios";

const Imagegeneratorchat = ({ setmenu, baseurl, setShowchatbot }) => {
    const [question, setQuestion] = useState("");
    const [numImages, setNumImages] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "image/png") {
            setSelectedFile(file);
            setErrorMessage(""); // エラーメッセージをクリア
        } else {
            setErrorMessage("Please select a PNG file."); // エラーメッセージを設定
        }
    };

    const handleQuestionSubmit = async () => {
        if (selectedFile) {
            // ファイルが選択されている場合
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('prompt', question);
            formData.append('num_images', numImages);

            console.log(formData);

            try {
                const response = await axios.post(`${baseurl}imageprocess/edit_image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response);

                if (response.status === 200) {
                    setGeneratedImages(response.data);
                } else {
                    console.error("Failed to edit image");
                }
            } catch (error) {
                console.error("Error editing images:", error);
            }
        } else {
            // ファイルが選択されていない場合
            try {
                const response = await axios.post(`${baseurl}imageprocess/generate`, {
                    prompt: question,
                    num_images: numImages,
                });

                console.log(response);

                if (response.status === 200) {
                    setGeneratedImages(response.data);
                } else {
                    console.error("Failed to generate image");
                }
            } catch (error) {
                console.error("Error generating images:", error);
            }
        }
    };

    const backtomenu = () => {
        setShowchatbot(false);
        setmenu(true);
    }

    return (
        <>
            <div className="back-to-menu">
                <button className="btn btn-secondary" onClick={backtomenu}>
                    Back to Menu
                </button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="input-container">
                <label htmlFor="file-input">
                    <MdOutlineAttachFile className="attach-icon" />
                </label>
                <input 
                    id="file-input" 
                    type="file" 
                    onChange={handleFileChange} 
                    style={{ display: "none" }} 
                />
                <textarea
                    className="form-control"
                    id="questionInput"
                    rows="1"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <input
                    type="number"
                    className="form-control num-images-input"
                    value={numImages}
                    onChange={(e) => setNumImages(e.target.value)}
                    min="1"
                    max="5"
                />
            </div>
            <button className="btn btn-primary send-button" onClick={handleQuestionSubmit}>
                <IoMdSend />
            </button>
            <div className="images-display">
                {generatedImages.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={`Generated ${index}`} />
                        <a href={image.url} download={`generated_image${index + 1}.png`}>
                            Download Image {index + 1}
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Imagegeneratorchat;