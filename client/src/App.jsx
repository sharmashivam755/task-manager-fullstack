import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;