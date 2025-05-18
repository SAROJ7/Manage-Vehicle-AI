import { Separator } from "@repo/ui/components/separator";
import ChatHeader from "./_components/ChatHeader";
import MessageInput from "./_components/MessageInput";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none">
        <ChatHeader />
        <Separator />
      </header>
      <div className="max-h-[475px] min-h-[475px] overflow-y-auto">
        <div className="flex items-center justify-center h-[350]">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              How may I assist you?
            </h1>
          </div>
        </div>
      </div>
      <footer className="flex-none">
        <Separator />
        <MessageInput />
      </footer>
    </div>
  );
};

export default HomePage;
