"use client";
import { useGetConversationQuery } from "@/query/conversation.query";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import { Suspense } from "react";
import ConversationCard from "./_component/ConversationCard";
import { Conversation } from "@repo/types";

export default function HistoryPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Conversations</h1>
          <p className="text-muted-foreground">Manage your Conversations</p>
        </div>
      </div>

      <div className="h-full py-6">
        <Suspense>
          <UserConversations />
        </Suspense>
      </div>
    </div>
  );
}

function UserConversations() {
  const { data: conversations } = useGetConversationQuery();
  if (!conversations)
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No Conversations Created Yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {conversations.map((conversation: Conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
