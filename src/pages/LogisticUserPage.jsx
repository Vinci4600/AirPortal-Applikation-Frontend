import { useEffect, useState } from "react";
import axios from "axios";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function LogisticUserPage(){
    const[logisticUsers,setLogisticUsers]=useState([]);
    const[firstname,setFirstname]= useState("");
    const[lastname,setLastname] = useState("");
    const[email,setEmail] = useState("");
    const[createDate,setCreateDate] = useState("");

     const fetchLogisticUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/logisticUser/all"
            );
            setLogisticUsers(response.data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
            alert("Fehler beim verbinden Mit der datenbank Keine Zugriffs Erlaubnis ");
        }
    };
    useEffect(() => {
        fetchLogisticUser();
    }, []);

    const addLogisticUser = async () => {

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
        if (!createDate || createDate.trim() === "") {
            alert("Bitte geben Sie ein Datum ein");
            return; // Abbrechen, wenn keine E-Mail vorhanden ist
        }

        try {
            await axios.post("http://localhost:8080/api/logisticUser/add", {
                firstname,
                lastname,
                email,
                createDate,
            });

            await fetchLogisticUser(); // warten bis neu geladen
            setFirstname("");
            setLastname("");
            setEmail("");
            setCreateDate("");
            alert("Logistic User Erfolgreich Hinzugefügt")
        } catch (error) {
            console.error("Fehler beim Hinzufügen:", error.response?.data);
            alert("Fehler beim Hinzufügen des Logistic Users")
        }
    };
     const deleteLogisticUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/logisticUser/delete/${id}`);
            await fetchLogisticUser(); // Liste aktualisieren
            alert("Logistic User Erfolgreich Gelöscht")
        } catch (error) {
            console.error("Fehler beim Löschen:", error.response?.data);
            alert("Fehler beim Löschen des Logistic Users Bitte an den Support wenden" )
        }
    };

     return (
        
        <div className="content">
             
            <h2>Neuer Logistic User</h2>

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
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="datetime-local"
                value={createDate}
                onChange={(e) => setCreateDate(e.target.value)}
            />

            <button className="addbutton" onClick={addLogisticUser}>Hinzufügen</button>

            <h2>Logistic Users</h2>

            <table className="logisticUser-table">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>E-Mail</th>
                        <th>Create Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logisticUsers.map((l) => (
                        <tr key={l.id}>

                            <td>{l.firstname}</td>
                            <td>{l.lastname}</td>
                            <td>{l.email}</td>
                            <td>{l.createDate}</td>
                            <td>
                                <button
                                    onClick={() => deleteLogisticUser(l.id)}
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
export default LogisticUserPage;