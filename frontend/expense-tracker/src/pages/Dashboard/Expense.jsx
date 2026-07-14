import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";

import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] =
    useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log(
        "Something went wrong. Please try again.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error(
        "Amount should be a valid number greater than 0."
      );
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(
        API_PATHS.EXPENSE.ADD_EXPENSE,
        {
          category,
          amount,
          date,
          icon,
        }
      );

      toast.success("Expense added successfully");

      setOpenAddExpenseModal(false);

      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      toast.success("Expense deleted successfully");

      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message ||
          error.message
      );

      toast.error("Something went wrong.");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `Expense_Report_${new Date().toLocaleDateString()}.xlsx`
      );

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to download expense report."
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Expense">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-5 text-lg text-gray-500">
            Loading Expenses...
          </p>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout activeMenu="Expense">
      <motion.div
        className="max-w-7xl mx-auto py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Expense Overview 💸
          </h1>

          <p className="text-gray-500 mt-2">
            Track your expenses, monitor your spending habits and manage your
            finances efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Expense Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </motion.div>

          {/* Expense List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) =>
                setOpenDeleteAlert({
                  show: true,
                  data: id,
                })
              }
              onDownload={handleDownloadExpenseDetails}
            />
          </motion.div>
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
          />
        </Modal>

        {/* Delete Expense Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({
              show: false,
              data: null,
            })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record?"
            onDelete={() =>
              deleteExpense(openDeleteAlert.data)
            }
          />
        </Modal>
      </motion.div>
    </DashboardLayout>
  );
};

export default Expense;