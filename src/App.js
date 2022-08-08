import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Container,
} from "@mui/material";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/compat/app";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <div className="app-header">FIREBASE TODO APPLICATION</div>
      <form className="form">
        <FormControl>
          <InputLabel>write a todo</InputLabel>
          <Input
            type="text"
            placeholder="enter a new todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          onClick={addTodo}
          disabled={!input}
        >
          add todo
        </Button>
      </form>
      <Container maxWidth="sm">
        <ul>
          {todos.map((todo, index) => (
            <Todo todo={todo} key={index} />
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default App;
