export interface MessageInputProps {
  onSubmit: (content: string) => Promise<void> | void;
  loading?: boolean;
}

export interface Message {
  id: string;
  content: string;
  role: "Human" | "Assistant" | "System";
  conversationId: string;
  metadata: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}
