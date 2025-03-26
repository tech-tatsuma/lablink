import React from "react";
import Attendanceview from "./Attendanceview";

const Attendancecontent = ({ baseurl, roomname}) => {
    return (
        <>
            {/* <!-- Page Wrapper --> */}
            <div id="page-top">
                <div id="wrapper">

                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                                {/* <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">


                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* <!-- Nav Item - User Information --> */}
                                    <li className="nav-item dropdown no-arrow">
                                        <button
                                                className="nav-link dropdown-toggle btn btn-link"
                                                id="userDropdown"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">在室状況</span>
                                            {/* <img class="img-profile rounded-circle" */}
                                            {/* src="#" /> */}
                                            <i className="fas fa-solid fa-user fa-2s text-gray-300"></i>
                                        </button>
                                    </li>

                                </ul>
                            </nav>
                            {/* ページのコンテンツ部分 */}
                            <Attendanceview baseurl={baseurl} roomname={roomname} />
                        </div>
                    </div>
                </div>
                {/* <!-- End of Page Wrapper --> */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Takemura Lab</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Attendancecontent;