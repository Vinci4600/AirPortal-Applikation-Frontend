import { useEffect, useState } from "react";
import axios from "axios";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function FlightPage() {
    const [flights, setFlights] = useState([]);
    const [flightNumber, setFlightNumber] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    const fetchFlights = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/flights/all"
            );
            setFlights(response.data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
            alert("Fehler beim Laden der Seite bitte Stellen sie sicher das Sie auf dem Richtigem port sind")
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    // Flug hinzufügen
    const addFlight = async () => {

        if (!flightNumber || flightNumber.trim() === "") {
            alert("Bitte geben Sie die Flugnummer ein.");
            return;
        }
        if (!departureTime || departureTime.trim() === "") {
            alert("Bitte geben Sie die Abflugszeit ein");
            return;
        }
        if (!arrivalTime || arrivalTime.trim() === "") {
            alert("Bitte geben Sie die Ankunftszeit ein");
            return;
        }
        const departureDate = new Date(departureTime);
        const arrivalDate = new Date(arrivalTime);


        // Vergleich: Ankunftszeit darf nicht vor Abflugzeit sein
        if (arrivalDate < departureDate) {
            alert("Die Ankunftszeit darf nicht vor der Abflugszeit liegen");
            return;
        }
        try {
            await axios.post("http://localhost:8080/api/flights/add", {
                flightNumber,
                departureTime,
                arrivalTime,
            });

            await fetchFlights(); // warten bis neu geladen
            setFlightNumber("");
            setDepartureTime("");
            setArrivalTime("");
            alert("Flight Erfolgreich Hnzugefügt")
        } catch (error) {
            console.error("Fehler beim Hinzufügen:", error.response?.data);
            alert("Fehler beim Hinzufügen des Fluges")
        }
    };

    // Flug löschen
    const deleteFlight = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/flights/delete/${id}`);
            await fetchFlights(); // Liste aktualisieren
            alert("Der Flug erfolgreich gelöscht")
        } catch (error) {
            console.error("Fehler beim Löschen:", error.response?.data);
            alert("Fehler beim Löschen bitte überprüffen Sie ob Sie auf dem Port 5173 sind")
        }
    };

    return (
        <div className="content">
            <h2>Neuer Flug</h2>

            <input
                placeholder="FlugNummer"
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

            <button className="addbutton" onClick={addFlight}>Hinzufügen</button>

            <h2>Flights</h2>

            <table className="flight-table">
                <thead>
                    <tr>
                        <th>Flightnumber</th>
                        <th>Departure Time</th>
                        <th>ArrivalTime</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((f) => (
                        <tr key={f.flight_id}>

                            <td>{f.flightNumber}</td>
                            <td>{f.departureTime}</td>
                            <td>{f.arrivalTime}</td>
                            <td>
                                <button
                                    onClick={() => deleteFlight(f.flight_id)}
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

export default FlightPage;