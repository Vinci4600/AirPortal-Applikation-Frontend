import { useEffect, useState } from "react";
import logo from "./components/Bilder/Airportal.png";
import "./components/styles/home.css";

function Home() {
  const welcomeTexts = [
    "Willkommen",
    "Welcome",
    "Bienvenue",
    "Benvenuto",
    "Bienvenido",
    "Hoşgeldiniz",
    "いらっしゃいませ",
    "欢迎",            // Chinesisch (Mandarin)
    "환영합니다",       // Koreanisch
    "Добро пожаловать", // Russisch
    "Bem-vindo",      // Portugiesisch
    "Witamy",         // Polnisch
    "Welkom",         // Niederländisch
    "Välkommen",      // Schwedisch
    "Velkommen",      // Norwegisch
    "Tervetuloa",     // Finnisch
    "Καλώς ήρθατε"    // Griechisch
  ];

  const slogan = "Smart fliegen. Einfach ankommen.";

  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(slogan.slice(0, i));
      i++;
      if (i > slogan.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">

        <h1 className="welcome-text" key={welcomeIndex}>
          {welcomeTexts[welcomeIndex]}
        </h1>

        <img src={logo} alt="AirPortal Logo" className="hero-logo" />

        <div className="slogan">
          {displayText}
        </div>

      </div>
    </div>
  );
}

export default Home;