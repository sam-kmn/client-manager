import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SplitPanel from "./components/SplitPanel";
import Form from "./components/Form";
import Table from "./components/Table";

export const ThemeContext = React.createContext();

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const switchDarkTheme = () => setDarkTheme(!darkTheme);

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/clients");
    const data = await res.json();
    // console.log(data);
    setClients(data);
    setLoading(false);
  };
  const addClient = async (client) => {
    const res = await fetch("http://localhost:5000/clients", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client),
    });

    const data = await res.json();
    setClients([...clients, data]);
  };
  const deleteClient = async (id) => {
    await fetch("http://localhost:5000/clients/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    setClients(clients.filter((client) => client.id !== id));
  };
  const editClient = async (client) => {
    const res = await fetch("http://localhost:5000/clients/" + client.id, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client),
    });
    const data = await res.json();

    setClients(
      clients.map((_client) => (_client.id === client.id ? data : _client))
    );
  };

  useEffect(() => fetchData(), []);

  const themeStyles = {
    backgroundColor: darkTheme ? "var(--darker)" : "var(--lighter)",
    color: darkTheme ? "var(--light)" : "var(--dark)",
  };

  return (
    <div className="App" style={themeStyles}>
      <ThemeContext.Provider value={darkTheme}>
        <Navbar onThemeSwitch={switchDarkTheme} />
        {loading ? (
          <div className="row pt-5 mt-5 justify-content-center align-items-center">
            <div className="col-auto fs-2">Loading</div>
            <div className="col-auto spinner-border" role="status"></div>
          </div>
        ) : (
          <SplitPanel
            left={
              Object.keys(clients).length ? (
                <Table
                  data={clients}
                  onDelete={deleteClient}
                  onEdit={setClient}
                />
              ) : (
                ""
              )
            }
            right={
              <Form
                onAdd={addClient}
                client={client}
                onEdit={editClient}
                onCancel={() => setClient({})}
              />
            }
          />
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
