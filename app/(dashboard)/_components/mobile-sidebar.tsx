import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { UserButton } from "@clerk/nextjs";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-tr ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
