import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './../css/sb-admin-2.css';
import './../css/sb-admin-2.min.css';
import './../vendor/fontawesome-free/css/all.min.css';

const Papersearchcontent = () => {
    const [inputText, setInputText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleClick = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://lablinkback-papersum.fly.dev/search?text=${inputText}`);
            if (res.data.result) {
                setSearchResults(res.data.result);
            } else {
                setSearchResults(["API request failed"]);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setSearchResults(["HTTP request failed"]);
        }
        setLoading(false);
    };

    return (
        <>
            {loading && 
                <div className="overlay" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                    <div className="col-md-6 text-center">
                        <h1 className="text-secondary">論文検索</h1>
                        <p className="text-secondary">キーワードを入力して論文の検索ができます</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input type="text" 
                                   className="form-control bg-light border-0 small styled-input"
                                   placeholder="Search text" 
                                   value={inputText} 
                                   onChange={handleChange}
                                   disabled={loading} />
                        </div>
                        <div style={{ textAlign: 'center', margin: '1rem' }}>
                            <button className="btn btn-primary"
                                    style={{ borderRadius: '0.35rem' }}
                                    onClick={handleClick}
                                    disabled={loading}>
                                検索
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                {searchResults.length === 0 ? (
                    <div className="col-md-12" style={{ textAlign: 'center' }}>
                        <p>Not Found</p>
                    </div>
                ) : (
                    searchResults.map((result, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <ReactMarkdown>
                                        {result}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </div>
        </>
    );
};

export default Papersearchcontent;
