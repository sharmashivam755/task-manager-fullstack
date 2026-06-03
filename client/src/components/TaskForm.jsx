import { useState, useEffect } from "react";
import axios from "axios";

function TaskForm({
  fetchTasks,
  editingTask,
  setEditingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask.id}`,
          {
            title,
            description,
            dueDate,
          }
        );

        setEditingTask(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            description,
            dueDate,
          }
        );
      }

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert(
        editingTask
          ? "Failed to update task"
          : "Failed to create task"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editingTask
          ? "Edit Task"
          : "Add Task"}
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <br />
      <br />

      <button type="submit">
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={handleCancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;