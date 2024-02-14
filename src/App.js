import "./App.css";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [newTodo, setNewTodo] = useState({
    name: "",
    done: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleNameChange = (e) => {
    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      name: e.target.value,
    }));
  };
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = () => {
      setIsLoading(true);
      try {
        axios.get(`${process.env.REACT_APP_URL}`).then((data) => {
          setTodos(data.data);
          console.log(data.data);
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}`,
        newTodo
      );
      console.log("Add response:", response.data);

      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding the todo:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      {isLoading ? (
        <div>Loading todos...</div>
      ) : (
        todos.map((todo) => (
          <Todo todo={todo} key={todo.id} setTodos={setTodos} />
        ))
      )}
      <div className="dodaj">
        <h2>Dodaj todo</h2>

        <div>todo:</div>

        <input type="text" value={newTodo.name} onChange={handleNameChange} />

        <button onClick={handleAddTodo}>dodaj</button>
      </div>
    </div>
  );
}
export default App;
