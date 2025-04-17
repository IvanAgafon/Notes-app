import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  notebookId: z.number(),
});

export const newNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  notebookId: z.number(),
});

export const noteUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});
