import { axiosInstance } from "@/components/providers/AxiosProvider";

export const createConversation = async (data: {
  userId: string;
  message: { role: string; content: string };
}) => {
  const response = await axiosInstance.post("/conversation", data);
  return response.data;
};

export const getConversations = async () => {
  const response = await axiosInstance.get("/conversation");
  return response.data;
};

export const deleteConversation = async (conversationId: string) => {
  const response = await axiosInstance.delete(
    `/conversation/${conversationId}`
  );
  return response.data;
};

export const getConversationMessages = async (conversationId: string) => {
  const response = await axiosInstance.get(
    `/conversation/${conversationId}/message`
  );
  return response.data;
};

export const createMessage = async ({
  conversationId,
  message,
}: {
  conversationId: string;
  message: {
    role: string;
    content: string;
  };
}) => {
  const response = await axiosInstance.post(
    `conversation/${conversationId}/message`,
    message
  );
  return response.data;
};
