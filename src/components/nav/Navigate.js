import React from 'react';
import './../../css/sb-admin-2.css';
import './../../css/sb-admin-2.min.css';
import './../../vendor/fontawesome-free/css/all.min.css';
import './../dashboard/css/Dashboardview.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { GiDinosaurRex } from "react-icons/gi";
import { SiNotion } from "react-icons/si";

const Navigate = ({ setisHomeValues, showNavigateValues, setshowNavigateValues, user_id, isAdmin, setisAdminView, setisplayground }) => {

    // この関数が呼び出されるとホーム画面が呼び出される
    const trueHome = () => {
        // データの取得
        setisHomeValues(true);
        setisAdminView(false);
        setisplayground(false);
        hideNavigate();
    };

    // この関数が呼び出されると備品管理画面が表示される
    const falseHome = () => {
        setisHomeValues(false);
        setisAdminView(false);
        setisplayground(false);
        hideNavigate();
    };

    // この関数が呼び出されると管理者画面が呼び出される
    const trueisAdminview = () => {
        setisHomeValues(false);
        setisAdminView(true);
        setisplayground(false);
        hideNavigate();
    };

    // この関数が呼び出されるとゲームの画面が呼び出される
    const showplayground = () => {
        setisHomeValues(false);
        setisAdminView(false);
        setisplayground(true);
        hideNavigate();
    }

    // ナビゲーションバーを隠すための関数
    const hideNavigate = () => {
        setshowNavigateValues(false);
    };

    const navigate = useNavigate();

    // ログアウトのために利用される関数
    const movepage = () => {
        localStorage.removeItem('T-lab_username');
        localStorage.removeItem('T-lab_userid');
        localStorage.removeItem('T-Lab_token')
        localStorage.removeItem('T-Lab_roomname')
        navigate('/login')
    };

    if (showNavigateValues === true) {
        if (isAdmin === false) {
            return (
                <>
                    {/* <!-- Sidebar --> */}
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                        {/* <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon">
                                <img src="/img/takemura-lab-logo_.png" alt="武村研究室のロゴ(logo of takemura lab)" style={{ maxHeight: '40%', maxWidth: '40%' }} />
                            </div>
                            <div className="sidebar-brand-text mx-3">LabLink</div>
                        </a>

                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/* <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <a className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>

                        {/* ホーム画面を呼び出すか備品管理画面を呼び出すかの管理を行うタブバー */}
                        <div className="font-japanese">
                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                Basic Menu
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={trueHome}>
                                    <i className="fas fa-fw fa-home"></i>
                                    <span>ホーム</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={falseHome}>
                                    <i className="fas fa-fw fa-list"></i>
                                    <span>備品管理</span></a>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/inlab">
                                <i className="fas fa-solid fa-chalkboard"></i>
                                <span>研究室内ボード</span>
                            </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='https://drive.google.com/drive/folders/1EKs5oNzoV-NupyrZo-RQHkTnqeuJKXba?usp=sharing'>
                                    <i className="fas fa-fw fa-regular fa-image"></i>
                                    <span>思い出</span></a>
                            </li>
                            <hr className="sidebar-divider" />
                            <div className="sidebar-heading">
                                Games
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={showplayground}>
                                    <GiDinosaurRex />
                                    <span> 恐竜ちゃん</span></a>
                            </li>
                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                Link List
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" href='https://www.notion.so/takemura-lab/Takemura-Lab-82850b93f7944170ad2f2dcd33c14831?pvs=4'>
                                    <SiNotion />
                                    <span>Notion</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='http://172.26.15.2:5000/'>
                                    <i className="fas fa-solid fa-share"></i>
                                    <span>NAS</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='https://github.com/takemura-lab'>
                                    <FontAwesomeIcon icon={faGitlab} />
                                    <span> GitHub</span></a>
                            </li>
                            <hr className="sidebar-divider" />
                            <div class="sidebar-heading">
                                Account
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={movepage}>
                                    <i className="fas fa-solid fa-user"></i>
                                    <span>ログアウト</span></a>
                            </li>
                        </div>
                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider" />
                        {/* <!-- Sidebar Toggler (Sidebar) --> */}
                        <div className="text-center d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={hideNavigate}></button>
                        </div>
                    </ul>
                    {/* <!-- End of Sidebar --> */}
                </>
            );
        } else {
            return (
                <>
                    {/* <!-- Sidebar --> */}
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                        {/* <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon">
                                <img src="/img/takemura-lab-logo_.png" alt="武村研究室のロゴ(logo of takemura lab)" style={{ maxHeight: '40%', maxWidth: '40%' }} />
                            </div>
                            <div className="sidebar-brand-text mx-3">Lab Link</div>
                        </a>

                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/* <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <a className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>

                        {/* ホーム画面を呼び出すか備品管理画面を呼び出すかの管理を行うタブバー */}
                        <div className="font-japanese">
                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                Basic Menu
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={trueHome}>
                                    <i className="fas fa-fw fa-home"></i>
                                    <span>ホーム</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={falseHome}>
                                    <i className="fas fa-fw fa-list"></i>
                                    <span>備品管理</span></a>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/inlab">
                                <i className="fas fa-solid fa-chalkboard"></i>
                                <span>研究室内ボード</span>
                            </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='https://drive.google.com/drive/folders/1EKs5oNzoV-NupyrZo-RQHkTnqeuJKXba?usp=sharing'>
                                    <i className="fas fa-fw fa-regular fa-image"></i>
                                    <span>思い出</span></a>
                            </li>
                            <hr className="sidebar-divider" />
                            <div className="sidebar-heading">
                                Games
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={showplayground}>
                                    <GiDinosaurRex />
                                    <span> 恐竜ちゃん</span></a>
                            </li>
                            {/* <!-- Divider --> */}
                            <hr className="sidebar-divider" />

                            {/* <!-- Heading --> */}
                            <div className="sidebar-heading">
                                Link List
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" href='https://www.notion.so/takemura-lab/Takemura-Lab-82850b93f7944170ad2f2dcd33c14831?pvs=4'>
                                    <SiNotion />
                                    <span> Notion</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='http://172.26.15.2:5000/'>
                                    <i className="fas fa-solid fa-share"></i>
                                    <span>NAS</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='https://github.com/takemura-lab'>
                                    <FontAwesomeIcon icon={faGitlab} />
                                    <span> GitHub</span></a>
                            </li>
                            <hr className="sidebar-divider" />
                            <div className="sidebar-heading">
                                Account
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" onClick={movepage}>
                                    <i className="fas fa-solid fa-user"></i>
                                    <span>ログアウト</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={trueisAdminview}>
                                    <i className="fas fa-solid fa-wrench"></i>
                                    <span>管理者ページ</span></a>
                            </li>
                        </div>
                        {/* <!-- Divider --> */}
                        <hr className="sidebar-divider" />
                        {/* <!-- Sidebar Toggler (Sidebar) --> */}
                        <div className="text-center d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={hideNavigate}></button>
                        </div>
                    </ul>
                    {/* <!-- End of Sidebar --> */}
                </>
            );
        }
    } else {

    };
}

export default Navigate;
