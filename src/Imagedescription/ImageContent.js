import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./../PaperSummary/Papsum.css";
import {useState} from "react";

const ImageContent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [inputText, setInputText] = useState("");
    const [responseMarkdown, setResponseMarkdown] = useState("");
    const [loading, setLoading] = useState(false);
    let summaryendpoint = 'https://lablinkback-papersum.fly.dev'

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setSelectedImage(img);
            setImagePreviewUrl(URL.createObjectURL(img));
        }
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedImage || !inputText) {
            alert("Please provide both an image and text.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('text', inputText);

        try {
            const response = await axios.post(`${summaryendpoint}/analyze_image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);

            setResponseMarkdown(response.data.choices[0].message.content);
        } catch (error) {
            console.error("Error:", error);
            setResponseMarkdown("Error: Unable to process the image.");
        }

        setLoading(false);
    };

    return (
        <>
        { loading && 
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="my-container">
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>LOADING</p>
                </div>
            </div> 
        }
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center"> {/* 中央揃えのためのクラス */}
                    <h1>Vision API</h1>
                    <div>
                        <input type="file" onChange={handleImageChange} disabled={loading} className="form-control mb-2" />
                        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="img-thumbnail mb-2" />}
                        <textarea 
                            className="form-control mb-2" 
                            placeholder="Enter text" 
                            rows="3" // 3行分の高さ
                            value={inputText} 
                            onChange={handleTextChange} 
                            disabled={loading}>
                        </textarea>
                        <button onClick={handleSubmit} disabled={loading} className="btn btn-primary">Submit</button>
                    </div>
                </div>
                <div className="row justify-content-center"> {/* Row to center horizontally */}
                    <div className="col-md-6"> {/* Column to define width */}
                        <div className="summary-container">
                            <ReactMarkdown>
                                 {responseMarkdown}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ImageContent;