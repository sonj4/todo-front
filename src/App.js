import "./App.css";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
// Amplify.configure(awsExports);
Amplify.configure({
  Auth: {
    Cognito: {
      region: "eu-central-1",
      userPoolClientId: "495drt6u91pqds57t0njssvk8v",
      userPoolId: "eu-central-1_G4us2iZBm",
      // loginWith: {
      // Optional
      // oauth: {
      //   domain:
      //     "abcdefghij1234567890-29051e27.auth.us-east-1.amazoncognito.com",
      //   scopes: ["openid email phone profile aws.cognito.signin.user.admin "],
      //   redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
      //   redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
      //   responseType: "code",
      // },
      // username: "false",
      // email: "true", // Optional
      // phone: "false", // Optional
      // },
    },
  },
});

function App({ signOut, user }) {
  const [newTodo, setNewTodo] = useState({
    name: "",
    done: false,
    userId: user.userId,
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
          const filteredTodos = data.data.filter(
            (todo) => user.userId === todo.userId
          );
          setTodos(filteredTodos);
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
      <Header signOut={signOut} user={user} />
      {isLoading ? (
        <div>Loading todos...</div>
      ) : (
        todos.map((todo) => (
          <Todo todo={todo} key={todo.id} setTodos={setTodos} />
        ))
      )}
      <div className="dodaj">
        <h2>Dodaj to do</h2>

        <div>Naziv:</div>

        <input type="text" value={newTodo.name} onChange={handleNameChange} />

        <button onClick={handleAddTodo}>DODAJ</button>
      </div>
    </div>
  );
}
export default withAuthenticator(App);
//export default App;
