import { Separator } from "@repo/ui/components/separator";
import { Plus, Settings } from "lucide-react";
import MessageInput from "./components/MessageInput";

const HomePage = () => {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 flex items-center justify-between">
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
        </header>
        <Separator />

        {/* Updated this section to be properly scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-12 min-h-0">
          <div className="flex gap-4 max-w-3xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="font-medium dark:text-white mb-1">Abhii</div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:text-gray-200">
                Hey, can you explain how the model determines token usage and
                tracks interactions?
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-w-3xl mx-auto">
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
            <div className="flex-1">
              <div className="font-medium dark:text-white mb-1">ARK.io</div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:text-gray-200">
                Our model counts tokens in both input and output, including
                spaces and special characters. Each token corresponds roughly to
                one word, depending on the language and complexity of the
                sentence. For more detailed tracking of your interactions, we
                use timestamps and session IDs to ensure the most relevant
                responses.
              </div>
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
            </div>
          </div>
        </div>

        <Separator />
        <MessageInput />
      </main>
    </div>
  );
};

export default HomePage;
