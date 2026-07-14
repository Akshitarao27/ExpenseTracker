import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-gray-200 px-7 py-4 sticky top-0 z-30 shadow-sm">
      <button
       className="block lg:hidden p-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-3xl text-gray-700" />
        ) : (
          <HiOutlineMenu className="text-3xl text-gray-700" />
        )}
      </button>

      <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
    ₹
  </div>

  <div>
    <h2 className="text-xl font-bold text-gray-800">
      Expense Tracker
    </h2>

    <p className="text-xs text-gray-500">
      Personal Finance Manager
    </p>
  </div>
</div>

      {openSideMenu && (
        <div className="fixed top-[64px] left-0 bg-white shadow-xl">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;