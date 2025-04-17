import { z } from "zod";
import { newNoteSchema, noteSchema, noteUpdateSchema } from "./schema";

export type NoteT = z.infer<typeof noteSchema>;
export type NewNoteT = z.infer<typeof newNoteSchema>;
export type UpdateNoteT = z.infer<typeof noteUpdateSchema>;

export type NoteAction =
  | { type: "SET_BOOKS"; payload: NoteT[] }
  | { type: "ADD_BOOK"; payload: NoteT }
  | { type: "DELETE_BOOK"; payload: NoteT["id"] }
  | { type: "EDIT_BOOK"; payload: NoteT };

export type NoteSliceT = {
  notes: NoteT[];
  isNoteEditModalOpen: boolean;
  selectedNoteId: number | null;
  // sortBy: keyof CompanyT;
  // sortOrder: 1 | -1;
  // isModalOpen: boolean;
};
