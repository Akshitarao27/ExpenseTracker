import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { addThousandsSeparator } from "../../utils/helper";

import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-lg font-medium text-gray-500">
            Loading Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <motion.div
        className="max-w-7xl mx-auto py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Here's an overview of your financial activity.
          </p>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(
                dashboardData?.totalBalance || 0
              )}
              color="bg-gradient-to-r from-indigo-500 to-violet-600"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(
                dashboardData?.totalIncome || 0
              )}
              color="bg-gradient-to-r from-green-500 to-emerald-400"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(
                dashboardData?.totalExpenses || 0
              )}
              color="bg-gradient-to-r from-red-500 to-pink-500"
            />
          </div>
        </motion.div>

        {/* Dashboard Components */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />

            <ExpenseTransactions
              transactions={
                dashboardData?.last30DaysExpenses?.transactions || []
              }
              onSeeMore={() => navigate("/expense")}
            />

            <Last30DaysExpenses
              data={
                dashboardData?.last30DaysExpenses?.transactions || []
              }
            />

            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
              }
              totalIncome={dashboardData?.totalIncome || 0}
            />

            <RecentIncome
              transactions={
                dashboardData?.last60DaysIncome?.transactions || []
              }
              onSeeMore={() => navigate("/income")}
            />
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Home;