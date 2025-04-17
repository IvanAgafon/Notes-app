import { z } from "zod";

export const notebookSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Title is required"),
});

export const newNotebookSchema = z.object({
  name: z.string().min(1, "Title is required"),
});

export const notebookUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
});
