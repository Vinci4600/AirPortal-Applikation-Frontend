import { useState } from "react";
import API from "../api"; // Falls du eine API-Instanz hast
import { useNavigate } from "react-router-dom";
import "./components/styles/otherstyles.css";

import "./components/styles/home.css";

function RegistrierungPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Formular-Standardverhalten verhindern

    try {
      const response = await API.post("/auth/register", {
        username,
        password,
        email
      });
      // Bei Erfolg z.B. Weiterleitung oder Meldung
      console.log("Registrierung erfolgreich:", response.data);
      navigate("/login"); // Beispiel: Weiterleitung zur Login-Seite
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      
    }
  };

  return (
    <div className="containert">
    <div className="login-container">
      <div className="login-box">
        <h1>Registrierung</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Registrieren</button>
      </form>
      </div>
    </div>
    </div>
    
  );
}

export default RegistrierungPage;