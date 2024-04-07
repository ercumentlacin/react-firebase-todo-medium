import AddIcon from "@mui/icons-material/Add";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../lib/firebase";
import { localStorage } from "../../lib/local-storage";
import AddTodoDialog from "./components/add-todo-dialog";
import EditTodo from "./components/edit-todo";
import TodoCard from "./components/todo";
import { todoSchema } from "./todo-schema";
import { type Todo } from "./todo-types";

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

export default function TodoPage() {
  const user = localStorage.get<User>("user")!;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const todosRef = useMemo(() => collection(db, "todos"), []);

  useEffect(() => {
    const todoQuery = query(todosRef, where("userId", "==", user.uid));

    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(todoQuery);
        const todos: Todo[] = [];
        querySnapshot.forEach((doc) => {
          const data = todoSchema.parse(doc.data());
          todos.push({
            id: doc.id,
            title: data.title,
            completed: data.completed,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userId: data.userId,
          });
        });
        setTodos(todos);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [todosRef, user.uid]);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h1" gutterBottom>
            <Stack direction="row" spacing={1}>
              <PlaylistAddCheckIcon fontSize="large" /> <span>Todo List</span>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          <Button
            startIcon={<AddIcon />}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setIsAddTodoDialogOpen(true)}
          >
            New Todo
          </Button>
        </Grid>
      </Grid>

      <AddTodoDialog
        open={isAddTodoDialogOpen}
        onClose={() => setIsAddTodoDialogOpen(false)}
        setTodos={setTodos}
        userId={user.uid}
      />

      <Divider />

      <Grid container spacing={2} marginBlock={2}>
        {editingTodo && (
          <EditTodo
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
            setTodos={setTodos}
          />
        )}

        <Grid item xs={12}>
          {todos.length === 0 ? (
            <Typography variant="body2" component="p" color="textSecondary">
              No todo found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {todos.map((item) => (
                <TodoCard
                  key={item.id}
                  item={item}
                  setTodos={setTodos}
                  setEditingTodo={setEditingTodo}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} marginBlock={2}>
        <Grid item xs={12}>
          <Typography variant="body2" component="p" color="textSecondary">
            Total: {todos.length} todo
          </Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
