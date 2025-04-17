import { z } from "zod";
import {
  newNotebookSchema,
  notebookSchema,
  notebookUpdateSchema,
} from "./schema";

export type NotebookT = z.infer<typeof notebookSchema>;
export type NewNotebookT = z.infer<typeof newNotebookSchema>;
export type UpdateNotebookT = z.infer<typeof notebookUpdateSchema>;

export type NoteAction =
  | { type: "SET_NOTEBOOKS"; payload: NotebookT[] }
  | { type: "ADD_NOTEBOOKS"; payload: NotebookT }
  | { type: "DELETE_NOTEBOOKS"; payload: NotebookT["id"] }
  | { type: "EDIT_NOTEBOOKS"; payload: NotebookT };

export type NotebookSliceT = {
  notebooks: NotebookT[];
  isAddModalOpen: boolean;
  isDetailsModalOpen: boolean;
  selectedNotebookId: number | null;
  isEditModalOpen: boolean;
};

