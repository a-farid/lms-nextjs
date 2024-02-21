import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full md:w-full w-full border-r border-black flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col h-full ">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
