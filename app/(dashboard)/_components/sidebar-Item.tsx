"use client";

import { SidebarItemProps } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (href == "/" && pathname == "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center p-2 pl-6 transition-all gap-x-2 text-slate-500 font-[500] hover:text-slate-600 hover:bg-slate-300/20 w-full text-left",
        isActive && "bg-sky-200/20 text-sky-700 border-r-4 border-sky-700"
      )}
    >
      <Icon scale={22} />
      {label}
    </button>
  );
};

export default SidebarItem;
