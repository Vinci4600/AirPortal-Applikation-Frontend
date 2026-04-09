import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import AircraftPage from "./pages/AircraftPage";
import FlightPage from "./pages/FlightPage";
import AirportPage from "./pages/AirportPage";
import PassengerPage from "./pages/PassengerPage";
import LogisticUserPage from "./pages/LogisticUserPage";
import LoginPage from "./pages/LoginPage";

import logo from "./assets/Airportal.png";

function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"));

  
  const handleLogout = () => {
    localStorage.clear();
    setToken(null); //  wichtig → Navbar updated sofort
  };

  return (
    <BrowserRouter>
      
      <nav>
        <img src={logo} alt="AirPortal Logo" style={{ height: "50px" }} />

        <Link to="/">Home</Link>

        {token && <> | <Link to="/aircraft">Aircraft</Link></>}
        {token && <> | <Link to="/flights">Flights</Link></>}
        {token && <> | <Link to="/airports">Airports</Link></>}
        {token && <> | <Link to="/passengers">Passengers</Link></>}
        {token && <> | <Link to="/logisticUser">Logistic Users</Link></>}

        {token ? (
          <> | <button onClick={handleLogout}>Logout</button></>
        ) : (
          <> | <Link to="/login">Login</Link></>
        )}
      </nav>

      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />

         
          <Route path="/login" element={<LoginPage setToken={setToken} />} />

          
          {token && <Route path="/aircraft" element={<AircraftPage />} />}
          {token && <Route path="/flights" element={<FlightPage />} />}
          {token && <Route path="/airports" element={<AirportPage />} />}
          {token && <Route path="/passengers" element={<PassengerPage />} />}
          {token && <Route path="/logisticUser" element={<LogisticUserPage />} />}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;