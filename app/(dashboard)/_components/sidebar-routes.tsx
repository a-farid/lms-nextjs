"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-Item";
import { usePathname } from "next/navigation";

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
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathName = usePathname();
  const isTeacher = pathName?.includes("/teacher");
  const routes = isTeacher ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          // icon={route.icon}
          // label={route.label}
          // href={route.href}
          {...route}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
