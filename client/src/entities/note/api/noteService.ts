import { AxiosInstance } from "axios";
import axiosInstance from "../../../shared/api/axiosInstance";
import { NewNoteT, NoteT, UpdateNoteT } from "../model/types";
import { noteSchema } from "../model/schema";

class NoteService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getNotes(): Promise<NoteT[]> {
    try {
      const response = await this.client.get("/notes");
      return noteSchema.array().parse(response.data);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async addNote(data: NewNoteT): Promise<NoteT> {
    try {
      const response = await this.client.post("/notes", data);
      return noteSchema.parse(response.data);
    } catch (error) {
      console.error("Create Note Error", error);
      throw error;
    }
  }

  async deleteNote(id: number): Promise<number> {
    try {
      await this.client.delete(`/notes/${id}`);
      return id;
    } catch (error) {
      console.error("Delete Note Error", error);
      throw error;
    }
  }

  async updateNote({ id, title, content }: UpdateNoteT): Promise<NoteT> {
    try {
      const response = await this.client.put(`/notes/${id}`, {
        title,
        content,
      });
      return noteSchema.parse(response.data);
    } catch (error) {
      console.error("Update Note Error", error);
      throw error;
    }
  }
}

export default new NoteService(axiosInstance);
