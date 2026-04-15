import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./components/styles/otherstyles.css";
import "./components/styles/home.css";
import { Link } from "react-router-dom";




// Token
function LoginPage({ setToken }) {
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
      setToken(res.data.token);

      navigate("/aircraft"); // nach login weiterleiten
    } catch (err) {
      console.error(err.response?.data);

      if (err.response?.status === 401) {
        alert("Falscher Username oder Passwort");// Feheler meldung wegen Passwort
      } else {
        alert("Serverfehler beim Login");// Fehlermeldung wegen server
      }
    }
  };

  return (


    <div className="containert">
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


          <Link to="/register">Jetzt Registrieren</Link>
        </div>
      </div>
    </div>




  );
}

export default LoginPage;