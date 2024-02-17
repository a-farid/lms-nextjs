"use client";

import { Compass, Layout } from "lucide-react";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const SidebarRoutes = () => {
  const routes = guestRoutes;
  return <div className="flex flex-col w-full">SidebarItems</div>;
};

export default SidebarRoutes;