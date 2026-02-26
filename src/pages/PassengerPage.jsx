import { useEffect, useState } from "react";
import axios from "axios";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function PassengerPage() {
    const [passengers, setPassengers] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const fetchPassengers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/passengers/all"
            );

            setPassengers(response.data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        }
    };
    useEffect(() => {
        fetchPassengers();
    }, []);

    const deletePassenger = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/passengers/delete/${id}`);
            await fetchPassengers(); // Liste aktualisieren
            alert("Passenger erfolgreich Gelöscht ");
        } catch (error) {
            console.error("Fehler beim Löschen:", error.response?.data);
            alert("Fehler beim Löschen des Passengers ");
        }
    };

    const addPassenger = async () => {

        // Überprüfung, ob Vorname und Nachname eingegeben wurden
        if (!firstname || firstname.trim() === "") {
            alert("Bitte geben Sie den Vornamen ein.");
            return;
        }
        if (!lastname || lastname.trim() === "") {
            alert("Bitte geben Sie den Nachnamen ein.");
            return;
        }
        if (!email || email.trim() === "") {
            alert("Bitte geben Sie eine E-Mail-Adresse ein.");
            return; // Abbrechen, wenn keine E-Mail vorhanden ist
        }
        // Überprüfung des E-Mail-Formats mit Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/passengers/add", {
                firstname,
                lastname,
                email,
            });

            await fetchPassengers(); // warten bis neu geladen
            setFirstname("");
            setLastname("");
            setEmail("");
            alert("Passenger erfolgreich hinzugefügt ");
        } catch (error) {
            console.error("Fehler beim Hinzufügen:", error.response?.data);
            alert("Fehler beim Hinzufügen des Passengers ");
        }
    };

    return (
        <div className="content">
            <h2>New Passenger</h2>

            <input
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />

            <input
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />

            <input
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="addbutton" onClick={addPassenger}>Hinzufügen</button>

            <h2>Passengers</h2>

            <table className="Passenger-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>E-Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((p, index) => (
                        <tr key={p.id}>
                            <td>{index + 1}</td>   {/* fortlaufende Nummer */}
                            <td>{p.firstname}</td>
                            <td>{p.lastname}</td>
                            <td>{p.email}</td>
                            <td>
                                <button
                                    onClick={() => deletePassenger(p.id)}
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

export default PassengerPage;