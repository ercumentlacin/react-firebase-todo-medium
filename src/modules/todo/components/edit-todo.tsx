import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../lib/firebase";
import { Todo } from "../todo-types";

interface Props {
  editingTodo: Todo;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function EditTodo({
  editingTodo,
  setEditingTodo,
  setTodos,
}: Props) {
  const todoRef = doc(db, "todos", editingTodo.id);

  return (
    <Grid item xs={12} marginBlock={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          fullWidth
          value={editingTodo.title}
          onChange={async (e) => {
            setEditingTodo((prevState) => {
              if (prevState) {
                return { ...prevState, title: e.target.value };
              }
              return prevState;
            });
          }}
        />

        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={async () => {
            const updatedAt = new Date();
            setTodos((prevState) =>
              prevState.map((t) => {
                if (t.id === editingTodo.id) {
                  return {
                    ...editingTodo,
                    updatedAt,
                  };
                }
                return t;
              })
            );
            await updateDoc(todoRef, editingTodo);
            toast.success("Todo updated successfully");
            setEditingTodo(null);
          }}
        >
          Save
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="error"
          onClick={() => setEditingTodo(null)}
        >
          Cancel
        </Button>
      </Stack>
    </Grid>
  );
}
