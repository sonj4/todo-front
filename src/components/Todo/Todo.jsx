import React from "react";
import "./Todo.css";
import axios from "axios";

export default function Todo({ todo, setTodos }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}${todo.id}`
      );
      setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
      console.log("Delete response:", response.data);
    } catch (error) {
      console.error("Error deleting the todo:", error);
    }
  };

  const handleChange = async (e) => {
    const updatedDone = e.target.checked;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}${todo.id}`,
        {
          ...todo,
          done: updatedDone,
        }
      );

      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === todo.id ? { ...item, done: updatedDone } : item
        )
      );

      console.log("Update response:", response.data);
    } catch (error) {
      console.error("Error updating the todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-subcontainer">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleChange}
        ></input>
        <p className={todo.done ? "todo-title done" : "todo-title not-done"}>
          {todo.name}
        </p>
      </div>

      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}
