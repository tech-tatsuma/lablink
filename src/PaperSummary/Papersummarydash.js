import React, { useState } from "react";
import './../css/sb-admin-2.css';
import './../css/sb-admin-2.min.css';
import './../vendor/fontawesome-free/css/all.min.css';
import './Papsum.css';  // The file where you put the CSS for the loader and overlay
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const Papersummarydashboard = () => {

    const [inputurl, setinputurl] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false); // NEW: state for loading

    const handleChange = (event) => {
        setinputurl(event.target.value);
    };

    const handleClick = async () => {
        setLoading(true); // Start loading
        console.log("Button clicked. Current input: ", inputurl);
        try {
            const response = await axios.get(`/summarize?arxiv_url=${inputurl}`);
            if (response.data.summary) {
                setSummary(response.data.summary);
                setinputurl("");  // Reset the input field and its state variable
            } else {
                setSummary("Error: Summary not available");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setSummary("Error: Unable to fetch summary");
        }
        setLoading(false); // End loading
    };

    return (
        <>
            { loading && 
                <div className="overlay" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="loader"></div>
                </div> 
            }
            <div className="container"> {/* Container to hold the form and summary */}
                <div className="row justify-content-center"> {/* Row to center horizontally */}
                    <div className="col-md-6"> {/* Column to define width */}
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" 
                                placeholder="arxiv url" aria-label="Search" 
                                aria-describedby="basic-addon2" 
                                value={inputurl}
                                onChange={handleChange} 
                                disabled={loading} />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={handleClick} disabled={loading}>
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center"> {/* Row to center horizontally */}
                    <div className="col-md-6"> {/* Column to define width */}
                        <div className="summary-container">
                            <ReactMarkdown>
                                {summary}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Papersummarydashboard;
