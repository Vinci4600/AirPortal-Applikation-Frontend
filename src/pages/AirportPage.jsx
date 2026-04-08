import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function AirportPage() {
  const [airports, setAirports] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [iataCode, setIataCode] = useState("");

  // 🔐 Token & Rolle
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const role = payload?.role;

  // 🌍 GET Airports
  const fetchAirports = async () => {
    try {
      const response = await API.get("/airports/all");
      setAirports(response.data);
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAirports();
    }
  }, [token]);

  // ❌ DELETE (nur Admin)
  const deleteAirport = async (id) => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen löschen!");
      return;
    }

    try {
      await API.delete(`/airports/delete/${id}`);
      await fetchAirports();
      alert("Airport erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen:", error.response?.data);
    }
  };

  // ➕ ADD (nur Admin)
  const addAirport = async () => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen hinzufügen!");
      return;
    }

    if (!name.trim() || !country.trim() || !iataCode.trim()) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    try {
      await API.post("/airports/add", {
        name,
        country,
        iataCode,
      });

      await fetchAirports();

      setName("");
      setCountry("");
      setIataCode("");

      alert("Airport erfolgreich hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };

  return (
    <div className="content">
      <h1>Airport Management</h1>

      {/* 🔒 Nur Admin sieht Formular */}
      {role === "ADMIN" && (
        <>
          <h2>New Airport</h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            placeholder="IATA Code"
            value={iataCode}
            onChange={(e) => setIataCode(e.target.value)}
          />

          <button className="addbutton" onClick={addAirport}>
            Hinzufügen
          </button>
        </>
      )}

      {/* ❗ Nicht eingeloggt */}
      {!token && <p>Bitte einloggen, um Airports zu sehen.</p>}

      {/* 📊 Tabelle für User + Admin */}
      {token && (
        <>
          <h2>Airports</h2>

          <table className="airport-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Land</th>
                <th>IATA Code</th>
                {role === "ADMIN" && <th>Aktionen</th>}
              </tr>
            </thead>
            <tbody>
              {airports.map((a, index) => (
                <tr key={a.id}>
                  <td>{index + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.country}</td>
                  <td>{a.iataCode}</td>

                  {role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => deleteAirport(a.id)}
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

export default AirportPage;