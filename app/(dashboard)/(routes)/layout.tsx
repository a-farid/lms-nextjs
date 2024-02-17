import Sidebar from "../_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="hidden md:flex h-full w-56 fixed left-0 flex-col inset-y-0 z-50 ">
        <Sidebar />
      </div>
      <div className="md:ml-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
