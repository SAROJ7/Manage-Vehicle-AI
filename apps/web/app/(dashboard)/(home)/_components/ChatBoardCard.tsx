/* eslint-disable @next/next/no-img-element */
"use client";
import { useUser } from "@clerk/nextjs";
import ReactMarkDown from "react-markdown";
import React from "react";
import { Message } from "@repo/types";

const ChatBoardCard = ({ messages }: { messages: Message[] }) => {
  console.log({ messages });
  const { user } = useUser();
  console.log({ user });
  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4 space-y-12 min-h-0">
        {messages.map((message: Message) => (
          <div key={message.id} className="flex gap-4 max-w-3xl mx-auto">
            {message.role === "Human" ? (
              <img
                src={user?.imageUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium dark:text-white mb-1">
                {message.role === "Human"
                  ? user?.fullName?.split(" ")[0] || "User"
                  : "Manage Vehicle AI"}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:text-gray-200">
                <ReactMarkDown>{message.content}</ReactMarkDown>
              </div>
              {message.role === "Assistant" && (
                <div className="flex items-center gap-2 mt-2">
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    32 tokens
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBoardCard;
