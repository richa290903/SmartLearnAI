import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gradient-to-br from-white to-slate-100 min-h-screen">

        {/* TopBar */}
        <div className="p-6">
          <TopBar />
        </div>

        {/* Page Content */}
        <div className="px-6 pb-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default MainLayout;