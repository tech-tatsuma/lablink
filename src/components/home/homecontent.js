// ホーム画面
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Homecontent.css";
import './../../css/sb-admin-2.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Homecontent = () => {
    const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsSplashScreenVisible(false);
        }, 3500);
    
        return () => clearTimeout(timer);
      }, []);
    
      return (
        <>
          {isSplashScreenVisible && (
            <div className="splash-screen d-flex justify-content-center align-items-center vh-100">
              <img src="/img/takemura-lab-logo.png" alt="武村研究室のロゴ" />
            </div>
          )}
    
          {!isSplashScreenVisible && (
            <>
              {/* ナビゲーションバー */}
              <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container-fluid">
                  <Link className="navbar-brand" to="/">武村研究室</Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/roomcreate">部屋の作成</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/roomcheck">部屋情報の確認</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/signup">アカウント作成</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">ログイン</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
    
              {/* メインコンテンツ */}
              <div className="container text-center mt-1">
                <header>
                  <div className="textarea">
                    <img
                      className='wow animate__animated animate__fadeInUp slow-animation'
                      src="/img/takemura-lab-logo_.png"
                      alt="武村研究室のロゴ"
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                    <h1 className="lab-title">Takemura Lab</h1>
                  </div>
                  <div className="image-area"></div>
                </header>
              </div>
              <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Takemura Lab</span>
                        </div>
                    </div>
                </footer>
            </>
          )}
        </>
      );
}

export default Homecontent;