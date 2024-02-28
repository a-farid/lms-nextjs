"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathName = usePathname();
  const isTeacher = pathName?.startsWith("/teacher");
  const isPlayer = pathName?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacher || isPlayer ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut size={24} className="mr-3" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
