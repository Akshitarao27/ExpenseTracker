import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import TransactionInfoCard from "../Cards/TransactionInfoCard";
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
      <div>
  <h5 className="text-xl font-semibold text-gray-800">
    Recent Transactions
  </h5>

  <p className="text-sm text-gray-500 mt-1">
    Your latest income and expense records
  </p>
</div>

<button
  className="card-btn hover:scale-105 transition-all duration-300"
  onClick={onSeeMore}
>
          See All <LuArrowRight className="text-lg group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>
      <div className="mt-5 space-y-2">
      
      {transactions?.length > 0 ? (
      transactions.slice(0, 5).map((item) => (
        <TransactionInfoCard
          key={item._id}
          title={item.type === "expense" ? item.category : item.source}
          icon={item.icon}
          date={moment(item.date).format("Do MMM YYYY")}
          amount={item.amount}
          type={item.type}
          hideDeleteBtn
        />
      ))
    ) : (
      <div className="text-center py-10">
        <p className="text-gray-400 text-sm">
          No recent transactions found.
        </p>
      </div>
    )}
  </div>
</div>
  );
};

export default RecentTransactions;