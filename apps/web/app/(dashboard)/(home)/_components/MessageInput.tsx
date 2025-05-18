"use client";
import { useCreateConversationMutation } from "@/query/conversation.query";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@repo/ui/components/textarea";
import { Loader2, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MessageInput = () => {
  const router = useRouter();
  const { user } = useUser();
  const [content, setContent] = useState("");
  const { mutateAsync: createConversation, isPending } =
    useCreateConversationMutation();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (!user?.id) {
      toast.error("User Not Found");
      return;
    }

    await createConversation(
      { userId: user?.id, message: { content, role: "Human" } },
      {
        onSuccess: (data) => {
          toast.success("Message sent successfully");
          setContent("");
          router.push(`${data.id}`);
        },
      }
    );
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Textarea
            className="w-full p-4 bg-transparent border-0 focus:ring-0 dark:text-white resize-none"
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 justify-between">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
            <button
              className="p-2 hover:bg-orange-100 dark:hover:bg-orange-700 rounded "
              disabled={isPending ? true : false}
              onClick={handleSubmit}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
              ) : (
                <Play className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
