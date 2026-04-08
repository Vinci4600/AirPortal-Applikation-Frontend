import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./components/styles/otherstyles.css";
import "./components/styles/home.css";
import "./components/styles/home.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/aircraft"); // nach login weiterleiten
    } catch (err) {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    
    <div className="content">
       <div className="home-container">
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
  );
}

export default LoginPage;