import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import DeleteAlert from "../../components/DeleteAlert";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOME
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      toast.success("Income added successfully");

      setOpenAddIncomeModal(false);

      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );

      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      );

      toast.success("Income deleted successfully");

      setOpenDeleteAlert({
        show: false,
        data: null,
      });

      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );

      toast.error("Something went wrong.");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
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
        `Income_Report_${new Date().toLocaleDateString()}.xlsx`
      );

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      toast.error("Failed to download income report.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Income">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-5 text-gray-500 text-lg">
            Loading Income...
          </p>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout activeMenu="Income">
      <motion.div
        className="max-w-7xl mx-auto py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Income Overview 💰
          </h1>

          <p className="text-gray-500 mt-2">
            Track all your income sources and manage your earnings efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Income Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </motion.div>

          {/* Income List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <IncomeList
              transactions={incomeData}
              onDelete={(id) =>
                setOpenDeleteAlert({
                  show: true,
                  data: id,
                })
              }
              onDownload={handleDownloadIncomeDetails}
            />
          </motion.div>
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({
              show: false,
              data: null,
            })
          }
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </motion.div>
    </DashboardLayout>
  );
};

export default Income;