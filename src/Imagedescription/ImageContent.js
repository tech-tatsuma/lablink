import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./../PaperSummary/Papsum.css";

const ImageContent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputText, setInputText] = useState("");
    const [responseMarkdown, setResponseMarkdown] = useState("");
    const [loading, setLoading] = useState(false);
    let summaryendpoint = 'https://lablinkback-papersum.fly.dev'

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
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

            setResponseMarkdown(response.data);
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
                    <h1>Image Description</h1>
                    <div>
                        <input type="file" onChange={handleImageChange} disabled={loading} className="form-control mb-2" />
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
                    <div>
                        <ReactMarkdown>{responseMarkdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ImageContent;