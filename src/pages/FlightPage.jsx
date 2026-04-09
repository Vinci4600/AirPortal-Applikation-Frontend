import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function FlightPage() {
  const [flights, setFlights] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [logisticUsers, setLogisticUsers] = useState([]);

  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [aircraftId, setAircraftId] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [logisticUserId, setLogisticUserId] = useState("");

  const token = localStorage.getItem("token");

  //  Token und Rolle prüfen
  let role = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload?.role;
    }
  } catch (e) {
    console.error("Token fehlerhaft");
  }
  console.log("ROLE:", role);

  //  Flights laden
  const fetchFlights = async () => {
    try {
      const response = await API.get("/flights/all");
      setFlights(response.data);
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  //  Dropdown-Daten laden
  const fetchDropdownData = async () => {
    try {
      const [aircraftRes, airportRes, logisticRes] = await Promise.all([
        API.get("/aircrafts/all"),
        API.get("/airports/all"),
        API.get("/logistic_users/all"),
      ]);
      setAircrafts(aircraftRes.data);
      setAirports(airportRes.data);
      setLogisticUsers(logisticRes.data);
    } catch (error) {
      console.error("Fehler beim Laden der Dropdowns:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFlights();
      fetchDropdownData();
    }
  }, [token]);

  //  Flug hinzufügen
  const addFlight = async () => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen hinzufügen!");
      return;
    }

    if (
      !flightNumber.trim() ||
      !departureTime ||
      !arrivalTime ||
      !aircraftId ||
      !departureAirportId ||
      !arrivalAirportId ||
      !logisticUserId
    ) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    try {
      await API.post("/flights/add", {
        flightNumber,
        departureTime: departureTime + ":00", // Sekunden hinzufügen
        arrivalTime: arrivalTime + ":00",
        aircraftId: parseInt(aircraftId),
        departureAirportId: parseInt(departureAirportId),
        arrivalAirportId: parseInt(arrivalAirportId),
        logisticUserId: parseInt(logisticUserId),
      });

      await fetchFlights();

      // Form zurücksetzen
      setFlightNumber("");
      setDepartureTime("");
      setArrivalTime("");
      setAircraftId("");
      setDepartureAirportId("");
      setArrivalAirportId("");
      setLogisticUserId("");

      alert("Flug erfolgreich hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data || error);
      alert("Fehler beim Hinzufügen. Prüfe Konsole.");
    }
  };

  //  Flug löschen
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

      {/*  Nur Admin */}
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

          <select value={aircraftId} onChange={(e) => setAircraftId(e.target.value)}>
            <option value="">Aircraft auswählen</option>
            {aircrafts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.model} ({a.manufacture})
              </option>
            ))}
          </select>

          <select value={departureAirportId} onChange={(e) => setDepartureAirportId(e.target.value)}>
            <option value="">Abflughafen auswählen</option>
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.iataCode})
              </option>
            ))}
          </select>

          <select value={arrivalAirportId} onChange={(e) => setArrivalAirportId(e.target.value)}>
            <option value="">Zielflughafen auswählen</option>
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.iataCode})
              </option>
            ))}
          </select>

          <select value={logisticUserId} onChange={(e) => setLogisticUserId(e.target.value)}>
            <option value="">Logistic User auswählen</option>
            {logisticUsers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.firstname} {l.lastname}
              </option>
            ))}
          </select>

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