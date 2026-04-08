import { useEffect, useState } from "react";
import API from "../api";
import "./components/styles/table.css";
import "./components/styles/otherstyles.css";

function LogisticUserPage() {
  const [logisticUsers, setLogisticUsers] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [createDate, setCreateDate] = useState("");

  //  Token und Rolle
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const role = payload?.role;

  //  GET Users
  const fetchLogisticUsers = async () => {
    try {
      const response = await API.get("/logisticUser/all");
      setLogisticUsers(response.data);
       } catch (error) { 
      console.error("Fehler beim Laden:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLogisticUsers();
    }
  }, [token]);

  //  ADD nur Admin
  const addLogisticUser = async () => {
    if (role !== "ADMIN") {//Role darf nur admin sein
      alert("Nur Admins dürfen hinzufügen!");
      return;
    }

    if (!firstname.trim() || !lastname.trim() || !email.trim() || !createDate) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    // Email validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Bitte gültige E-Mail eingeben!");
      return;
    }

    try {
      await API.post("/logisticUser/add", {
        firstname,
        lastname,
        email,
        createDate,
      });

      await fetchLogisticUsers();

      setFirstname("");
      setLastname("");
      setEmail("");
      setCreateDate("");

      alert("User erfolgreich hinzugefügt");
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error.response?.data);
    }
  };

  //  DELETE nur Admin
  const deleteLogisticUser = async (id) => {
    if (role !== "ADMIN") {//== ADMIN nur die rolle admin hat zugriff
      alert("Nur Admins dürfen löschen!");
      return;
    }

    try {
      await API.delete(`/logisticUser/delete/${id}`);
      await fetchLogisticUsers();
      alert("User erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen:", error.response?.data);
    }
  };

  return (
    <div className="content">
      <h1>Logistic User Management</h1>

      
      {role === "ADMIN" && (
        <>
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

          <button className="addbutton" onClick={addLogisticUser}>
            Hinzufügen
          </button>
        </>
      )}

     
      {!token && <p>Bitte einloggen, um User zu sehen.</p>}

     
      {token && (
        <>
          <h2>Logistic Users</h2>

          <table className="logisticUser-table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>E-Mail</th>
                <th>Create Date</th>
                {role === "ADMIN" && <th>Aktionen</th>}
              </tr>
            </thead>

            <tbody>
              {logisticUsers.map((l) => (
                <tr key={l.id}>
                  <td>{l.firstname}</td>
                  <td>{l.lastname}</td>
                  <td>{l.email}</td>
                  <td>{l.createDate}</td>

                  {role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => deleteLogisticUser(l.id)}
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

export default LogisticUserPage;