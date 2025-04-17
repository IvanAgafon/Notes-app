import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNotebook,
  fetchNotebooks,
  postNotebook,
  updateNotebook,
} from "./notebookThunks";
import { NotebookSliceT } from "./types";

const initialState: NotebookSliceT = {
  notebooks: [],
  isAddModalOpen: false,
  isDetailsModalOpen: false,
  isEditModalOpen: false,
  selectedNotebookId: null,
};

export const notebookSlice = createSlice({
  name: "notebooks",
  initialState,
  reducers: {
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    openNotebookDetails: (state, action) => {
      state.isDetailsModalOpen = true;
      state.selectedNotebookId = action.payload;
    },
    closeNotebookDetails: (state) => {
      state.isDetailsModalOpen = false;
      state.selectedNotebookId = null;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedNotebookId = action.payload;
    },

    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotebooks.fulfilled, (state, action) => {
      state.notebooks = action.payload;
    });
    builder.addCase(fetchNotebooks.rejected, (state, action) => {
      console.error(action.error);
      state.notebooks = [];
    });

    builder.addCase(postNotebook.fulfilled, (state, action) => {
      state.notebooks.push(action.payload);
    });
    builder.addCase(postNotebook.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(deleteNotebook.fulfilled, (state, action) => {
      state.notebooks = state.notebooks.filter(
        (notebook) => notebook.id !== action.payload
      );
    });
    builder.addCase(deleteNotebook.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(updateNotebook.fulfilled, (state, action) => {
      state.notebooks = state.notebooks.map((notebook) => {
        if (notebook.id === action.payload.id) {
          return action.payload;
        }
        return notebook;
      });
    });
    builder.addCase(updateNotebook.rejected, (_, action) => {
      console.error(action.error);
    });
  },
});

export const {
  openAddModal,
  closeAddModal,
  openNotebookDetails,
  closeNotebookDetails,
  closeEditModal,
  openEditModal,
} = notebookSlice.actions;

export default notebookSlice.reducer;
