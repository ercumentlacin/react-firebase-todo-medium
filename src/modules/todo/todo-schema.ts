import { Timestamp } from "firebase/firestore";
import { z } from "zod";
export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z
    .instanceof(Timestamp)
    .default(() => Timestamp.now())
    .transform((timestamp) => timestamp.toDate()),
  updatedAt: z
    .instanceof(Timestamp)
    .default(() => Timestamp.now())
    .transform((timestamp) => timestamp.toDate()),
  userId: z.string(),
});
