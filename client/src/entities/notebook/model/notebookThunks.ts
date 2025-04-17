import { createAsyncThunk } from "@reduxjs/toolkit";
import notebookService from "../api/notebookService";

import { NewNotebookT, NotebookT, UpdateNotebookT } from "./types";

export const fetchNotebooks = createAsyncThunk("notebooks/fetchNotebooks", () =>
  notebookService.getNotebooks()
);

export const postNotebook = createAsyncThunk(
  "notebooks/postNotebooks",
  (data: NewNotebookT) => notebookService.addNotebook(data)
);

export const deleteNotebook = createAsyncThunk(
  "notebooks/deleteNotebook",
  async (id: NotebookT["id"]) => {
    await notebookService.deleteNotebook(id);
    return id;
  }
);

export const updateNotebook = createAsyncThunk(
  "notebook/updateNotebook",
  async ({ id, name }: UpdateNotebookT) => {
    const updated = await notebookService.updateNotebook({ id, name });
    return updated;
  }
);
