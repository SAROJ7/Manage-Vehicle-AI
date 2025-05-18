import { Textarea } from "@repo/ui/components/textarea";
import React from "react";

const MessageInput = () => {
  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Textarea
            className="w-full p-4 bg-transparent border-0 focus:ring-0 dark:text-white resize-none"
            placeholder="Type your message..."
          />
          <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
