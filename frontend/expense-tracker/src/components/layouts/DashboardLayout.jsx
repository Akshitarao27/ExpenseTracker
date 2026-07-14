import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />
      <div className="flex min-h-[calc(100vh-64px)]">
  {user && (
       <div className="hidden lg:block flex-shrink-0">
      <SideMenu activeMenu={activeMenu} />
    </div>
  )}

<div className="flex-1 px-6 py-6 overflow-x-hidden">
    {children}
  </div>
</div>
      
    </div>
  );
};

export default DashboardLayout;