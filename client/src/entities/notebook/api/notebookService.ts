import { AxiosInstance } from "axios";
import axiosInstance from "../../../shared/api/axiosInstance";
import { notebookSchema } from "../model/schema";
import { NewNotebookT, NotebookT, UpdateNotebookT } from "../model/types";

class NotebookService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getNotebooks(): Promise<NotebookT[]> {
    try {
      const response = await this.client.get("/notebooks");
      return notebookSchema.array().parse(response.data);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async addNotebook(data: NewNotebookT): Promise<NotebookT> {
    try {
      const response = await this.client.post("/notebooks", data);
      return notebookSchema.parse(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw error;
    }
  }

  async deleteNotebook(id: number): Promise<void> {
    try {
      await this.client.delete(`/notebooks/${id}`);
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async updateNotebook({ id, name }: UpdateNotebookT): Promise<NotebookT> {
    try {
      const response = await this.client.put(`/notebooks/${id}`, { name });
      return notebookSchema.parse(response.data);
    } catch (error) {
      console.error("Error updating notebook:", error);
      throw error;
    }
  }
}

export default new NotebookService(axiosInstance);
