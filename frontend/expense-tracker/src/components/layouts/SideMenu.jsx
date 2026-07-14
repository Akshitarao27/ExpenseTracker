import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({activeMenu}) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 p-6 sticky top-[61px] z-20 shadow-sm">
      <div className="flex flex-col items-center justify-center gap-3 mt-4 mb-8 pb-6 border-b border-gray-100">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 rounded-full border-4 border-indigo-100 shadow-md object-cover"
          />
        ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
  
  <h5 className="text-gray-800 text-lg font-semibold leading-6">
          {user?.fullName || ""}
        </h5>
      </div>
  
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] font-medium py-3 px-5 rounded-xl mb-2 transition-all duration-300 ${
            activeMenu === item.label
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:bg-indigo-50 hover:text-primary"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-[22px]" />
          {item.label}
        </button>
      ))}
    </div>
  );
  
};

export default SideMenu;