import React from "react";
import Membersinlab from "./Membersinlab";
import './../../css/sb-admin-2.css'
import './../../css/sb-admin-2.min.css'
import './../../vendor/fontawesome-free/css/all.min.css';
import './../dashboard/css/Dashboardview.css';

const Dashboardinlabcontent = ({ user_id, baseurl }) => {

    return (
        <>
            <div className="container-fluid">

                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">LABLINK</h1>
                </div>


                {/* <!-- Content Row --> */}
                <div className="row">

                    {/* <!-- Content Column --> */}
                    <div className="col-lg-12 mb-4">

                        <Membersinlab baseurl={baseurl} user_id={user_id} />

                    </div>
                </div>
            </div>
        </>
    );

}

export default Dashboardinlabcontent;