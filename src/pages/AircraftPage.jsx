import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function AircraftPage() {
  const [aircrafts, setAircrafts] = useState([]);
  const [model, setModel] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [gewicht, setGewicht] = useState("");

  // Token & Rolle prüfen
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const role = payload?.role; // 'USER' oder 'ADMIN'

  //  Alle Aircraft laden (nur wenn eingeloggt)
  const fetchAircrafts = async () => {
    try {
      //  Token im Header mitsenden
      const response = await API.get("/aircrafts/all", {
        headers: {
          Authorization: `Bearer ${token}`, // ← WICHTIG für Spring Security
        },
      });
      setAircrafts(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Aircrafts:", error);
    }
  };

  useEffect(() => {
    if (token) { // nur laden, wenn eingeloggt
      fetchAircrafts();
    }
  }, [token]);

  // Aircraft hinzufügen (nur Admin)
  const addAircraft = async () => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen Flugzeuge hinzufügen!");
      return;
    }

    if (!model.trim() || !manufacture.trim() || !gewicht.trim()) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    const gewichtNumber = parseInt(gewicht, 10);
    if (!Number.isInteger(gewichtNumber)) {
      alert("Das Gewicht muss eine ganze Zahl sein.");
      return;
    }

    try {
      //  Token im Header mitsenden
      await API.post(
        "/aircrafts/add",
        { model, manufacture, gewicht },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← WICHTIG für Spring Security
          },
        }
      );
      await fetchAircrafts();

      // Felder leeren
      setModel("");
      setManufacture("");
      setGewicht("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };

  // Aircraft löschen (nur Admin)
  const deleteAircraft = async (id) => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen Flugzeuge löschen!");
      return;
    }

    try {
      //  Token im Header mitsenden
      await API.delete(`/aircrafts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ← WICHTIG für Spring Security
        },
      });
      await fetchAircrafts();
      alert("Flugzeug erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen:", error.response?.data);
    }
  };

  return (
    <div className="content">
      <h1>Aircraft Management</h1>


      {role === "ADMIN" && (
        <>
          <h2>New Aircraft</h2>
          <input
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            placeholder="Manufacture"
            value={manufacture}
            onChange={(e) => setManufacture(e.target.value)}
          />
          <input
            placeholder="Gewicht in Tonnen"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
          />
          <button className="addbutton" onClick={addAircraft}>
            Hinzufügen
          </button>
        </>
      )}


      {!token && <p>Bitte einloggen, um Aircrafts sehen zu können.</p>}

      {/* Tabelle für User/Admin */}
      {token && (
        <>
          <h2>All Aircraft</h2>
          <table className="Aircraft-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Manufacture</th>
                <th>Gewicht</th>
                {role === "ADMIN" && <th>Aktionen</th>}
              </tr>
            </thead>
            <tbody>
              {aircrafts.map((a, index) => (
                <tr key={a.id}>
                  <td>{index + 1}</td>
                  <td>{a.model}</td>
                  <td>{a.manufacture}</td>
                  <td>{a.gewicht}</td>
                  {role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => deleteAircraft(a.id)}
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

export default AircraftPage;