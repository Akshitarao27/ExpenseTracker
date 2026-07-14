import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
    
  return (
    <div className="group relative flex items-center gap-4 mt-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 rounded-2xl overflow-hidden">
      {icon ? (
  <span className="text-4xl">{icon}</span>
) : (
  <LuUtensils className="text-indigo-700 text-2xl" />
)}
</div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{date}</p>
        </div>
      

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${getAmountStyles()}`}
        >
          <h6 className="text-sm font-semibold">
            {type === "income" ? "+" : "-"} ₹{amount}
          </h6>

          {type === "income" ? (
            <LuTrendingUp />
          ) : (
            <LuTrendingDown />
          )}
        </div>
      </div>
     </div>

    </div>
  );
};

export default TransactionInfoCard;