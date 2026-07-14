import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;