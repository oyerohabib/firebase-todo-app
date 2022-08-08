import React, { useState } from "react";
import { List, ListItem, ListItemText, Modal, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 330,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4),
  },
  input: {
    marginRight: "10px",
    padding: "8px 5px",
  },
}));

export default function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // update todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    // close modal afterwards
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <input
            type="text"
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={classes.input}
          />
          <Button variant="contained" onClick={updateTodo}>
            update Todo
          </Button>
        </div>
      </Modal>
      <List>
        <ListItem disablePadding>
          <ListItemText primary={props.todo.todo} />
          <EditIcon onClick={handleOpen} />
          <DeleteForeverIcon
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </ListItem>
      </List>
    </>
  );
}
