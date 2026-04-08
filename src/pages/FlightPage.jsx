import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function FlightPage() {
  const [flights, setFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const token = localStorage.getItem("token");

  // 🔒 Sicheres Token-Decoding
  let role = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    }
  } catch (e) {
    console.error("Token fehlerhaft");
  }

  // 📥 Flights laden
  const fetchFlights = async () => {
    try {
      const response = await API.get("/flights/all");
      setFlights(response.data);
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFlights();
    }
  }, [token]);

  // ➕ Flug hinzufügen
  const addFlight = async () => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen hinzufügen!");
      return;
    }

    if (!flightNumber.trim() || !departureTime || !arrivalTime) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    try {
      await API.post("/flights/add", {
        flightNumber,
        departureTime,
        arrivalTime,
      });

      await fetchFlights();

      setFlightNumber("");
      setDepartureTime("");
      setArrivalTime("");

      alert("Flug erfolgreich hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };

  // 🗑️ Flug löschen
  const deleteFlight = async (id) => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen löschen!");
      return;
    }

    try {
      await API.delete(`/flights/delete/${id}`);
      await fetchFlights();
      alert("Flug erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen:", error.response?.data);
    }
  };

  return (
    <div className="content">
      <h1>Flight Management</h1>

      {/* 🔒 Nur Admin */}
      {role === "ADMIN" && (
        <>
          <h2>Neuer Flug</h2>

          <input
            placeholder="Flugnummer"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />

          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />

          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />

          <button className="addbutton" onClick={addFlight}>
            Hinzufügen
          </button>
        </>
      )}

      {!token && <p>Bitte einloggen, um Flüge zu sehen.</p>}

      {token && (
        <>
          <h2>Flights</h2>

          <table className="flight-table">
            <thead>
              <tr>
                <th>Flightnumber</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                {role === "ADMIN" && <th>Aktionen</th>}
              </tr>
            </thead>

            <tbody>
              {flights.map((f) => (
                <tr key={f.id}>
                  <td>{f.flightNumber}</td>

                  {/* 🔥 Schönes Datum */}
                  <td>{new Date(f.departureTime).toLocaleString()}</td>
                  <td>{new Date(f.arrivalTime).toLocaleString()}</td>

                  {role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => deleteFlight(f.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Löschen
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default FlightPage;