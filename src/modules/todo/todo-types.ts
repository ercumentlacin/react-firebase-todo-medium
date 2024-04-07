import { z } from "zod";
import { todoSchema } from "./todo-schema";

export type Todo = z.infer<typeof todoSchema>;
