import { Message } from "./message.interface";

export interface Conversation {
  id: string;
  title: string | null;
  userId: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  messages: Message[];
}
