import { useEffect, useState } from "react";
import axios from "axios";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";


function AircraftPage() {
  const [aircrafts, setAircrafts] = useState([]);
  const [model, setModel] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [gewicht, setGewicht] = useState("");

  // Alle Aircraft laden
  const fetchAircrafts = async () => {
    const response = await axios.get("http://localhost:8080/api/aircraft/all");
    setAircrafts(response.data);
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  // Aircraft hinzufügen
  const addAircraft = async () => {

    if (!model || model.trim() === "") {
      alert("Bitte geben Sie ein Model ein.");
      return;
    }
    if (!manufacture || manufacture.trim() === "") {
      alert("Bitte geben Sie den Hersteller ein.");
      return;
    }
    if (!gewicht || gewicht.trim() === "") {
      alert("Bitte geben Sie das Gewicht ein.");
      return;
    }
    const gewichtNumber = parseInt(gewicht, 10);
    if (!Number.isInteger(gewichtNumber)) {
      alert("Das Gewicht muss eine ganze Zahl sein.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/aircraft/add", {
        model,
        manufacture,
        gewicht,
      });

      await fetchAircrafts();

      // Felder leeren
      setModel("");
      setManufacture("");
      setGewicht("");

    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
      console.error(error);
    }
  };
  // Aircraft Löschen 

  const deleteAircraft = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/aircraft/delete/${id}`
      );
      fetchAircrafts(); // Liste neu laden
      alert("Flugzeug erfolgreich gelöscht")
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };


  return (
    <div class="content">

      <h1>Aircraft Management</h1>

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
      <button className="addbutton" onClick={addAircraft}>Hinzufügen</button>
      <h2>All Aircraft</h2>
      <table className="Aircraft-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Manifacture</th>
            <th>Gewicht</th>
          </tr>
        </thead>
        <tbody>


          {aircrafts.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.model}</td>
              <td>{a.manufacture}</td>
              <td>{a.gewicht}</td>
              <td>
                <button
                  onClick={() => deleteAircraft(a.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>



    </div>
  );
}
export default AircraftPage;