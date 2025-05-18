"use client";

import Loading from "@/components/Loading";
import { useGetConversationMesssagesQuery } from "@/query/conversation.query";
import { Separator } from "@repo/ui/components/separator";
import { useParams } from "next/navigation";
import ChatBoardCard from "../_components/ChatBoardCard";
import ChatHeader from "../_components/ChatHeader";
import MessageAppend from "../_components/MessageAppend";

const HomePage = () => {
  const { id } = useParams();

  const {
    data: messages,
    isLoading,
    isError,
  } = useGetConversationMesssagesQuery(id as string);

  if (isError || !messages) return <div>Error Fetching Messages</div>;
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-none">
          <ChatHeader />
          <Separator />
        </header>
        <div className="max-h-[475px] min-h-[475px] overflow-y-auto">
          <ChatBoardCard key={messages.id} messages={messages} />
        </div>
        <footer className="flex-none">
          <Separator />
          <MessageAppend />
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
