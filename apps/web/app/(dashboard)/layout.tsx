import DesktopSidebar from "@/components/DesktopSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen ">
      <div className="w-full shrink-0">
        <DesktopSidebar>{children}</DesktopSidebar>
      </div>
    </div>
  );
};

export default layout;
