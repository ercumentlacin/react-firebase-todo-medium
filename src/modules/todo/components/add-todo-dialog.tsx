import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../lib/firebase";
import { todoSchema } from "../todo-schema";
import { Todo } from "../todo-types";

interface Props {
  open: boolean;
  onClose: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  userId: string;
}

export default function AddTodoDialog({
  open,
  onClose,
  setTodos,
  userId,
}: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async () => {
    if (!title) {
      setError("Title is required");
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      const id = nanoid();
      const newTodo = todoSchema.parse({
        id,
        title,
        completed: false,
        userId,
      });

      setTodos((prevState) => [newTodo, ...prevState]);
      await setDoc(doc(db, "todos", id), newTodo);

      toast.success("Todo added successfully");
      onClose();
      setTitle("");
    } catch (error) {
      console.log("🚀 ~ handleAddTodo ~ error:", error);
      setError("Failed to add todo");
      toast.error("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleAddTodo} color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
