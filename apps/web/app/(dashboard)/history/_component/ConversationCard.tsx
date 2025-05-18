import TooltipWrapper from "@/components/ToolTipWrapper";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";
import { FileTextIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteConversationDialog from "./DeleteConversationDialog";
import { Conversation } from "@repo/types";

const MAX_CHARACTERS = 50;

const ConversationCard = ({ conversation }: { conversation: Conversation }) => {
  const truncatedContent = conversation.messages[1]?.content
    ? conversation.messages[1].content.slice(0, MAX_CHARACTERS) +
      (conversation.messages[1].content.length > MAX_CHARACTERS ? "..." : "")
    : "";

  return (
    <Card
      className="border border-separate shadow-sm rounded-lg 
        overflow-hidden hover:shadow-md dark:shadow-primary/30"
    >
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              "bg-orange-400 text-white-600"
            )}
          >
            <FileTextIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/${conversation.id}`}
                className="flex items-center hover:underline"
              >
                {truncatedContent}
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ConversationActions conversationId={conversation.id} />
        </div>
      </CardContent>
    </Card>
  );
};

function ConversationActions({ conversationId }: { conversationId: string }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More Actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConversationDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        conversationId={conversationId}
      />
    </>
  );
}

export default ConversationCard;
