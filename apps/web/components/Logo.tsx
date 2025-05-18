import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { SquareDashedMousePointer } from "lucide-react";

const Logo = ({ iconSize = 15 }: { iconSize?: number }) => {
  return (
    // <Link
    //   href="/"
    //   className={cn(
    //     "text-2xl font-extrabold flex items-center gap-2",
    //     fontSize
    //   )}
    // >
    //   <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
    //     <SquareDashedMousePointer size={iconSize} className="stroke-white" />
    //   </div>
    //   <div>
    //     <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
    //       ManageVehicle
    //     </span>
    //     <span className="text-stone-700 dark:text-stone-300">AI</span>
    //   </div>
    // </Link>

    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
              <SquareDashedMousePointer
                size={iconSize}
                className="stroke-white"
              />
            </div>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Manage Vehicle AI</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default Logo;
