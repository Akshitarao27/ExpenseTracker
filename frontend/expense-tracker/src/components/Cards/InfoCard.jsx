import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="group flex items-center gap-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div
  className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
>
        {icon}
      </div>

      <div>
      <h6 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-2">
          {label}
        </h6>

        <span className="text-3xl font-bold text-gray-900">
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;