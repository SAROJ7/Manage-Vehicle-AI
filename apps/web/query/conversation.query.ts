import {
  createConversation,
  createMessage,
  deleteConversation,
  getConversationMessages,
  getConversations,
} from "@/api/conversation.api";
import { TAGS } from "@/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateConversationMutation = () => {
  return useMutation({
    mutationKey: [TAGS.CREATE_CONVERSATION],
    mutationFn: createConversation,
    onError: () => {
      toast.error(`Failed to create a conversation`);
    },
  });
};

export const useGetConversationQuery = () => {
  return useQuery({
    queryKey: [TAGS.GET_CONVERSATIONS],
    queryFn: () => getConversations(),
  });
};

export const useDeleteConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TAGS.GET_CONVERSATIONS],
      });
    },
  });
};

export const useGetConversationMesssagesQuery = (id: string) => {
  return useQuery({
    queryKey: [TAGS.GET_MESSAGES, id],
    queryFn: () => getConversationMessages(id),
  });
};

export const useCreateConversationMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [TAGS.CREATE_MESSAGE],
    mutationFn: createMessage,
    onError: () => {
      toast.error(`Failed to send message`);
    },
    onSuccess: (_, variables) => {
      console.log({ variables });
      // Invalidate the query for the specific conversation ID
      queryClient.invalidateQueries({
        queryKey: [TAGS.GET_MESSAGES, variables.conversationId],
      });
      toast.success("Message sent successfully");
    },
  });
};
