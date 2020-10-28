import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("repositories").then(res => {
      setRepositories(res.data)
    })
  }, []
  );

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repostório${Date.now()}`,
      url: "github.com/projeto",
      techs: "React, JS"
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`) 

    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
