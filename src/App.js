import React from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import './css/App.css';
import Loginform from "./Accounts/Loginform"
import Dashboardroot from "./Dashboardroot";
import axios from 'axios';
import { useEffect, useState } from "react";
import Dashboardinlabroot from "./Dashboardinlab/Dashboardinlabroot";
import Attendancecontent from "./extern/Attendancecontent";
import Logininlabcontent from "./Dashboardinlab/Logininlabcontent";
import Signupform from "./Accounts/Signup";

// Appコンポーネントの定義
const App = () => {
  return (
    // アプリケーションのルート（ページのURL）を定義します。
    <div>
      <Routes>
        {/* 各ルート(ページ)に対応するコンポーネントを定義 */}
        {/* <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/atofficechange" element={<Atofficechange />} />
        <Route path="/dashboard/inlab/:id" element={<Dashboardinlab />} />
        <Route path="/inlab/login" element={<Logininlab />} />
        <Route path="/attendance-info" element={<Attendance />} />
        <Route exect path='/qr-scanned' element={<QRScanned />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

//Appコンポーネントのエクスポート
export default App;

// QRコードスキャン時にレンダリングされるコンポーネント
const QRScanned = () => {
  useEffect(() => {
    // コンポーネントがマウントされた時、QRコードがスキャンされたと判定
    localStorage.setItem("qrScanned", "true");
    // その後、/attendance-infoにリダイレクト
    window.location.href = "/attendance-info";
  }, []);

  return null; // このコンポーネントは何も表示しない
};

const SignUp = () => {
  let baseurl = "https://lablinkback.fly.dev";
  return (
    <div>
      <Signupform baseurl={baseurl} />
    </div>
  );
}

// ホーム画面のコンポーネント
const Home = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  useEffect(() => {
    // スプラッシュスクリーンを3.5秒後に非表示に設定
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // スプラッシュスクリーンの表示と非表示の処理
  return (
    <>
      {isSplashScreenVisible && (
        // スプラッシュスクリーンが表示されている時の内容
        <div className="splash-screen">
          <img src="/img/takemura-lab-logo.png" alt="武村研究室のロゴ" />
        </div>
      )}

      {!isSplashScreenVisible && (
        // スプラッシュスクリーンが非表示の時の内容
        <div className="container text-center mt-5">
          <header>
            <div className="textarea">
              <img className='wow animate__animated animate__fadeInUp slow-animation' src="/img/takemura-lab-logo_.png" alt="武村研究室のロゴ" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              <p>　</p>
              <h1>LabLink</h1>
              <p>　</p>
              <strong style={{ color: "black" }}>made by takemura lab</strong>
              <p>　</p>
              <p><Link to="/login" className="button" role="button">ログイン</Link></p>
            </div>
            <div className="image-area"></div>
          </header>
        </div>
      )}
    </>
  );
};

// ログインフォームのコンポーネント
const Login = () => {
  let baseurl = "https://lablinkback.fly.dev";
  return (
    <div>
      <Loginform baseurl={baseurl} />
    </div>
  );
};

// `/attendance-info`ページでQRコードスキャンの確認を行うAttendanceコンポーネント
const Attendance = () => {
  const navigate = useNavigate();
  let baseurl = "https://lablinkback.fly.dev";
  
  useEffect(() => {
    // ローカルストレージ内のqrScanned値の確認
    if (localStorage.getItem("qrScanned") !== "true") {
      // 存在しない場合、ユーザーをリダイレクト
      navigate('/notfound');
    } else {
      // QRコードがスキャンされている場合、ローカルストレージからフラグを削除
      localStorage.removeItem("qrScanned");
    }
  }, []);

  return (
    <div>
      <Attendancecontent baseurl={baseurl} />
    </div>
  );
}

// 研究室内ログインページのコンポーネント
const Logininlab = () => {
  let baseurl = "https://lablinkback.fly.dev";
  return (
    <div>
      <Logininlabcontent baseurl={baseurl} />
    </div>
  )
}

// ユーザーダッシュボードコンポーネント
const Dashboard = () => {
  const params = useParams();
  const user_id = params.id;
  let baseurl = "https://lablinkback.fly.dev";
  return (
    <div>
      {/* ダッシュボードにユーザーIDを渡す */}
      <Dashboardroot user_id={user_id} baseurl={baseurl} />
    </div>
  );

};

// 在室状況変更用コンポーネント
export const Atofficechange = () => {

  const navigate = useNavigate();

  const movepage = () => {
    // ローカルストレージからトークンとユーザー名を削除し、ログインページにリダイレクト
    localStorage.removeItem('access_token');
    localStorage.removeItem('T-lab_username');
    navigate('/login')
  };


  let baseurl = "https://lablinkback.fly.dev";

  useEffect(() => {
    // ユーザー名をローカルストレージから取得
    const username = localStorage.getItem('T-lab_username');
    if (!username) {
      navigate('/login');
      return null;
    };

    // ユーザー情報の取得と更新
    axios.get(baseurl + '/user').then(res => {
      const user = res.data.find(user => user.name === username);
      if (user) {
        axios.get(baseurl + `/user/get_user/${user.id}`).then(res => {
          const userData = res.data;
          if (userData) {
            const updatedUserData = {
              "name": userData.name,
              "icon": userData.icon,
              "birthday": userData.birthday,
              "is_admin": userData.is_admin,
              "at_office": !userData.at_office, // 在室状況の切り替え
              "current": userData.current,
              "target": userData.target
            };
            axios.post(baseurl + `/user/update/${user.id}`, updatedUserData)
              .then(res => {
                console.log('User data updated successfully.', res.data);
                navigate('/dashboard/' + user.id);
              })
              .catch(err => {
                console.error('Error updating user data.', err);
                movepage();
              });
          }
        })
          .catch(err => {
            console.error('Error getting user data.', err);
            movepage();
          });
      }
    })
      .catch(err => {
        console.error('Error getting user id.', err);
        movepage();
      });
  }, []);

  return null;
};

// 404ページ（見つからないページ）のコンポーネント
const NotFound = () => {
  return (
    <>
      <div className="container text-center mt-5">
        <header>
          <div className="textarea">
            <h1>只今メンテナンス中です</h1>
          </div>
          <div class="image-area">
            <img class="image" src="/img/home_background1.jpg" alt='武村研究室(takemura lab)の背景画像' />
          </div>
        </header>
      </div>
    </>
  );
}

// 研究室内のダッシュボードコンポーネント
const Dashboardinlab = () => {
  let baseurl = "https://lablinkback.fly.dev";
  const params = useParams();
  const user_id = params.id;

  return (
    <div>
      <Dashboardinlabroot user_id={user_id} baseurl={baseurl} />
    </div>
  )
}