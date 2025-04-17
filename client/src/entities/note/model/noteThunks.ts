import { createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../api/noteService";
import { NewNoteT, UpdateNoteT } from "./types";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () =>
  noteService.getNotes()
);

export const postNote = createAsyncThunk("notes/postNote", (data: NewNoteT) =>
  noteService.addNote(data)
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: number) => {
    return await noteService.deleteNote(id);
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title, content }: UpdateNoteT) => {
    const updated = await noteService.updateNote({ id, title, content });
    return updated;
  }
);
