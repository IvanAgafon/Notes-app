import { createSlice } from "@reduxjs/toolkit";
import { NoteSliceT } from "./types";
import { deleteNote, fetchNotes, postNote, updateNote } from "./noteThunks";

const initialState: NoteSliceT = {
  notes: [],
  isNoteEditModalOpen: false,
  selectedNoteId: null,
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openEditNoteModal: (state, action) => {
      state.isNoteEditModalOpen = true;
      state.selectedNoteId = action.payload;
    },
    closeEditNoteModal: (state) => {
      state.isNoteEditModalOpen = false;
      state.selectedNoteId = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      console.error(action.error);
      state.notes = [];
    });

    builder.addCase(postNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    });
    builder.addCase(postNote.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    });
    builder.addCase(deleteNote.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    });
    builder.addCase(updateNote.rejected, (_, action) => {
      console.error(action.error);
    });
  },
});

export const { openEditNoteModal, closeEditNoteModal } = noteSlice.actions;

export default noteSlice.reducer;
