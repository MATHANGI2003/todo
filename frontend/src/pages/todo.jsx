import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/todos";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  /* FETCH TODOS */
  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  /* ADD TODO */
  const addTask = async () => {
    if (!task.trim()) return;

    const res = await axios.post(API_URL, { text: task });
    setTodos((prev) => [res.data, ...prev]);
    setTask("");
  };

  /* DELETE TODO */
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 To-Do List</h1>

        <div style={styles.inputBox}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter activity..."
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {todos.map((item) => (
            <li key={item._id} style={styles.listItem}>
              {item.text}
              <button
                onClick={() => deleteTask(item._id)}
                style={styles.deleteBtn}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

/* STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    width: 400,
    padding: 25,
    borderRadius: 18,
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },
  title: {
    textAlign: "center",
    color: "#6c63ff",
  },
  inputBox: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "2px solid #ddd",
  },
  addBtn: {
    background: "linear-gradient(135deg,#6c63ff,#48c6ef)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    cursor: "pointer",
  },
  list: { padding: 0 },
  listItem: {
    background: "#f4f6ff",
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  deleteBtn: {
    background: "#ff4d6d",
    border: "none",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
  },
};
