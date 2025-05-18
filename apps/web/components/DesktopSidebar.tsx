/* eslint-disable @next/next/no-img-element */
"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Separator } from "@repo/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@repo/ui/components/sidebar";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Settings2,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import BreadcrumbHeader from "./BreadcrumbHeader";
import Logo from "./Logo";
import { ModeToggle } from "./ThemeModeToggle";

const routes = [
  {
    title: "Playground",
    href: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        href: "/",
      },
      {
        title: "History",
        href: "history",
      },
      {
        title: "AI Feedback",
        href: "ai-feedback",
      },
    ],
  },
  {
    title: "Models",
    href: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        href: "#",
      },
      {
        title: "Explorer",
        href: "#",
      },
      {
        title: "Quantum",
        href: "#",
      },
    ],
  },
  {
    title: "Anlaytics",
    href: "",
    icon: BookOpen,
    items: [
      {
        title: "Policies and Docs",
        href: "policies",
      },
      {
        title: "Performance",
        href: "performance",
      },
    ],
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        href: "#",
      },
      {
        title: "Team",
        href: "#",
      },
      {
        title: "Billing",
        href: "#",
      },
      {
        title: "Limits",
        href: "#",
      },
    ],
  },
];

const DesktopSidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar> & { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {routes.map((route) => (
                <Collapsible
                  key={route.title}
                  asChild
                  defaultOpen={route.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={route.title}>
                        {route.icon && <route.icon />}
                        <span>{route.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {route.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.href} key={item.href}>
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <img
                      src={user?.imageUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {isLoaded && user?.fullName}
                      </span>
                      <span className="truncate text-xs">
                        {user?.emailAddresses[0]?.emailAddress}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  {/* <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">
                          CNnn
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                    <UserButton>
                      <SignedIn />
                    </UserButton>
                  </DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbHeader />
          </div>
          <div className="fixed right-4">
            <ModeToggle />
          </div>
        </header>
        <main className="p-6 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DesktopSidebar;
