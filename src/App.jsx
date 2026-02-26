import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AircraftPage from "./pages/AircraftPage";
import FlightPage from "./pages/FlightPage";
import AirportPage from "./pages/AirportPage";
import PassengerPage from "./pages/PassengerPage";
import LogisticUserPage from "./pages/LogisticUserPage";
import logo from "./assets/Airportal.png"; 




function App() {
  
  return (
    <BrowserRouter>
      <nav>
         <img src={logo} alt="AirPortal Logo" style={{ height: "50px" }} />
        <Link to="/">Home</Link> |{" "}
        <Link to="/aircraft">Aircraft</Link>|{""}
        <Link to="/flights">Flights</Link>|{""}
        <Link to="/airports">Airports</Link>|{""}
        <Link to="/passengers">Passengers</Link>|{""}
        <Link to="/logisticUser">Logistic Users</Link>
      </nav>
<div class="content">
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/aircraft" element={<AircraftPage />} />
  <Route path="/flights" element={<FlightPage />}/>
  <Route path="/airports" element={<AirportPage/>}/>
  <Route path="/passengers" element={<PassengerPage/>}/>
  <Route path="/logisticUser" element={<LogisticUserPage/>}/>
</Routes>
</div>

    </BrowserRouter>
  );
}

export default App;
