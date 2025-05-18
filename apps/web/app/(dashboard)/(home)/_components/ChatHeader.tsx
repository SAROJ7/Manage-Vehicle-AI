import { Plus, Settings } from "lucide-react";
import React from "react";

const ChatHeader = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold dark:text-white">
          Chat with the Manage Vehicle AI
        </h2>
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300 hidden md:flex">
          GPT-4.o
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
        </div>
        <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
