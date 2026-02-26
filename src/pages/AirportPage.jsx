import { useEffect, useState } from "react";
import axios from "axios";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function AirportPage (){
    const[airports,setAirports]= useState([]);
const [name, setName] = useState("");
const [country, setCountry]= useState("");
const [iataCode, setIataCode]= useState("");

const fetchAirports = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/airports/all"
            );
            
            setAirports(response.data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
            alert("Fehler Beim Ladne schauen sie ob Sie auf dem locallhost5173 sind")
        }
    };

    useEffect(() => {
        fetchAirports();
    }, []);

      const deleteAirport = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/airports/delete/${id}`);
            await fetchAirports(); // Liste aktualisieren
            alert("Airport Erfolgreich Gelöscht")
        } catch (error) {
            console.error("Fehler beim Löschen:", error.response?.data);
            alert("Fehler beim Löschen Bitte überprüffen sie Ob Es einen Flug gibt der diesen Flughafen als Reise Ziel hat Oder das sie auf dem port 5173 sind")
        }
    };
    //Flughafen Hinzufügen
     const addAirport = async () => {

        
        if (!name || name.trim() === "") {
            alert("Bitte geben Sie den Namen des Flughafens ein.");
            return;
        }
        
        if (!country || country.trim() === "") {
            alert("Bitte geben Sie das Land ein.");
            return;
        }
        
        if (!iataCode || iataCode.trim() === "") {
            alert("Bitte geben Sie den IATA Code ein.");
            return;
        }
        try {
            await axios.post("http://localhost:8080/api/airports/add", {
                name,
                country,
                iataCode,
            });

            await fetchAirports(); // warten bis neu geladen
            setName("");
            setCountry("");
            setIataCode("");
            alert("Airport Erfolgreich Hinzugefügt")
        } catch (error) {
            console.error("Fehler beim Hinzufügen:", error.response?.data);
            alert("Fehler beim Hinzufügen Stellen Sie sicher das sie auf dem Port 5173 sind Sonst melden sie sich bitte beim Support")
        }
    };
      return (
    <div className="content">
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
                placeholder="Iata Code"
                value={iataCode}
                onChange={(e) => setIataCode(e.target.value)}
            />

            <button className="addbutton" onClick={addAirport}>Hinzufügen</button>

     <h2>Airports</h2>

      <table className="airport-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Land</th>
            <th>IATA Code</th>
          </tr>
        </thead>
        <tbody>
          
            {airports.map((a, index) => (
            <tr key={a.id}>
                <td>{index + 1}</td>
              <td>{a.name}</td>
              <td>{a.country}</td>
              <td>{a.iataCode}</td>
              <td>
                 <button
                            onClick={() => deleteAirport(a.id)}
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



export default AirportPage;