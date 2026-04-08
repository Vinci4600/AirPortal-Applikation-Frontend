import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function PassengerPage() {
  const [passengers, setPassengers] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  // Token & Rolle
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const role = payload?.role;

  //  GET
  const fetchPassengers = async () => {
    try {
      const response = await API.get("/passengers/all");
      setPassengers(response.data);
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPassengers();
    }
  }, [token]);

  //  DELETE
  const deletePassenger = async (id) => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen löschen!");
      return;
    }

    try {
      await API.delete(`/passengers/delete/${id}`);
      await fetchPassengers();
      alert("Passenger erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen:", error.response?.data);
    }
  };

  //  ADD
  const addPassenger = async () => {
    if (role !== "ADMIN") {
      alert("Nur Admins dürfen hinzufügen!");
      return;
    }

    if (!firstname.trim() || !lastname.trim() || !email.trim()) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Bitte gültige E-Mail eingeben!");
      return;
    }

    try {
      await API.post("/passengers/add", {
        firstname,
        lastname,
        email,
      });

      await fetchPassengers();

      setFirstname("");
      setLastname("");
      setEmail("");

      alert("Passenger erfolgreich hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };

  return (
    <div className="content">
      <h1>Passenger Management</h1>

     
      {role === "ADMIN" && (
        <>
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

          <button className="addbutton" onClick={addPassenger}>
            Hinzufügen
          </button>
        </>
      )}

      {!token && <p>Bitte einloggen.</p>}

      {token && (
        <>
          <h2>Passengers</h2>

          <table className="Passenger-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>E-Mail</th>
                {role === "ADMIN" && <th>Aktionen</th>}
              </tr>
            </thead>

            <tbody>
              {passengers.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.firstname}</td>
                  <td>{p.lastname}</td>
                  <td>{p.email}</td>

                  {role === "ADMIN" && (
                    <td>
                      <button onClick={() => deletePassenger(p.id)}>
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

export default PassengerPage;