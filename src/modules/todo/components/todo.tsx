import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../lib/firebase";
import { type Todo } from "../todo-types";

interface Props {
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export default function Todo({ item, setTodos, setEditingTodo }: Props) {
  const todoRef = doc(db, "todos", item.id);

  return (
    <Grid item xs={12}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Checkbox
          checked={item.completed}
          onChange={async (e) => {
            setTodos((prevState) =>
              prevState.map((t) => {
                if (t.id === item.id) {
                  return { ...t, completed: e.target.checked };
                }
                return t;
              })
            );
            await updateDoc(todoRef, { completed: e.target.checked });
            toast.success("Todo updated successfully");
          }}
        />
        <Typography variant="body1" component="p" style={{ flex: 1 }}>
          {item.title}
        </Typography>
        <Button
          size="small"
          startIcon={<EditIcon />}
          variant="outlined"
          color="primary"
          onClick={() => setEditingTodo(item)}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          onClick={async () => {
            setTodos((prevState) => prevState.filter((t) => t.id !== item.id));
            await deleteDoc(todoRef);
            toast.success("Todo deleted successfully");
          }}
        >
          Delete
        </Button>
      </Stack>
    </Grid>
  );
}
