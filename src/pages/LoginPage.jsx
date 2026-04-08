import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./components/styles/otherstyles.css";
import "./components/styles/home.css";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        usernameOrEmail: username,
        password: password,
      });
localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("username", res.data.username);
      

      navigate("/aircraft"); // nach login weiterleiten
    } catch (err) {
  console.error(err.response?.data);

  if (err.response?.status === 401) {
    alert("Falscher Username oder Passwort");
  } else {
    alert("Serverfehler beim Login");
  }
}
  };

  return (


    <div className="home-container">
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>


          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>



  );
}

export default LoginPage;