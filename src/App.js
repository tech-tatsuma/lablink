import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Root from "./components/dashboard/Root";
import axios from "axios";
import { useEffect } from "react";
import Dashboardinlabroot from "./components/inlab/Dashboardinlabroot";
import Attendancecontent from "./components/attendance/Attendancecontent";
import Homecontent from "./components/home/homecontent"
import RoomCreate from "./components/auth/RoomCreate";
import RoomPassword from "./components/auth/RoomPassword";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Passwordupdate from "./components/auth/Passwordupdate";

// 環境変数からAPIのベースURLを取得
const baseurl = process.env.REACT_APP_BASE_URL;

// アプリのルーティングを管理するメインコンポーネント
const App = () => {
  return (
    // アプリケーションのルート（ページのURL）を定義します。
    <div>
      <Routes>
        {/* 各ルート(ページ)に対応するコンポーネントを定義 */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginRoute />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/atofficechange" element={<Atofficechange />} />
        <Route path="/dashboard/inlab" element={<Dashboardinlab />} />
        <Route path="/attendance-info/:roomname" element={<Attendance />} />
        <Route exect path='/qr-scanned/:roomname' element={<QRScanned />} />
        <Route path="/signup" element={<SignUpRoute />} />
        <Route path="/roomcreate" element={<RoomCreateRoute />} />
        <Route path="/roomcheck" element={<RoomCheckRoute />} />
        <Route path="/passupdate" element={<PasswordUpdateRoute />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// QRコードスキャン時に実行されるコンポーネント（画面表示なしでリダイレクト処理のみ）
const QRScanned = () => {
  const { roomname } = useParams();

  useEffect(() => {
    localStorage.setItem("qrScanned", "true");
    window.location.href = `/attendance-info/${roomname}`;
  }, [roomname]);

  return null;
};

// 新規登録ページのコンポーネント
const SignUpRoute = () => {
  return (
    <div>
      <Signup backendurl={baseurl} />
    </div>
  );
}

// ホーム画面のコンポーネント
const Home = () => {
  return (
    <div>
      <Homecontent />
    </div>
  );
};

// ログインフォームのコンポーネント
const LoginRoute = () => {
  return (
    <div>
      <Login backendurl={baseurl} />
    </div>
  );
};

const RoomCreateRoute = () => {
  return (
    <div>
      <RoomCreate backendurl={baseurl} />
    </div>
  );
}

const RoomCheckRoute = () => {
  return (
    <div>
      <RoomPassword backendurl={baseurl} />
    </div>
  );
}

// 出席管理のページのコンポーネント
const Attendance = () => {
  const navigate = useNavigate();
  const { roomname } = useParams();

  useEffect(() => {
    // ローカルストレージ内のqrScanned値の確認
    if (localStorage.getItem("qrScanned") !== "true") {
      // 存在しない場合、ユーザーをリダイレクト
      navigate('/notfound');
    } else {
      // QRコードがスキャンされている場合、ローカルストレージからフラグを削除
      localStorage.removeItem("qrScanned");
    }
  }, [navigate]);

  return (
    <div>
      <Attendancecontent baseurl={baseurl} roomname={roomname} />
    </div>
  );
}

// ユーザーダッシュボードコンポーネント
const Dashboard = () => {
  return (
    <div>
      <Root baseurl={baseurl} />
    </div>
  );

};

// 在室状況の切り替えコンポーネント
export const Atofficechange = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function changestatus() {
      const userid = localStorage.getItem('T-lab_userid') || "";
      try {
        const response = await axios.post(`${baseurl}/user/atoffice_switch`, {
          user_id: userid
        });
        console.log(response.data);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    }

    changestatus();

  }, [navigate]);
  return null;
};

// 404ページのコンポーネント
const NotFound = () => {
  return (
    <>
      <div class="container-fluid">
      <div class="text-center">
      <div class="error mx-auto" data-text="404">404</div>
      <p class="lead text-gray-800 mb-5">Page Not Found</p>
      <p class="text-gray-500 mb-0">君は見てはいけないものを見ているね</p>
      <p class="text-gray-500 mb-0">大人しく自分の場所に戻るんだ...</p>
</div>

</div>
    </>
  );
}

// 研究室内のダッシュボードのコンポーネント
const Dashboardinlab = () => {

  return (
    <div>
      <Dashboardinlabroot baseurl={baseurl} />
    </div>
  )
}

const PasswordUpdateRoute = () => {
  return (
    <div>
      <Passwordupdate baseurl={baseurl} />
    </div>
  )
}