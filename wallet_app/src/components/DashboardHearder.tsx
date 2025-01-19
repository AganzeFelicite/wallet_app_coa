import React, { useState } from "react";
import { Bell } from "react-feather";

const DashboardHeader = () => {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showRegisterExpenseModal, setShowRegisterExpenseModal] =
    useState(false);

  // Toggle functions for modals
  const openAddIncomeModal = () => setShowAddIncomeModal(true);
  const closeAddIncomeModal = () => setShowAddIncomeModal(false);

  const openRegisterExpenseModal = () => setShowRegisterExpenseModal(true);
  const closeRegisterExpenseModal = () => setShowRegisterExpenseModal(false);

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex items-center space-x-4">
            {/* Add Income Button */}
            <button
              className="p-2 rounded-full hover:bg-green-100 bg-green-500 text-white"
              onClick={openAddIncomeModal}
            >
              Add Income
            </button>

            {/* Register Expenses Button */}
            <button
              className="p-2 rounded-full hover:bg-red-100 bg-red-500 text-white"
              onClick={openRegisterExpenseModal}
            >
              Register Expenses
            </button>

            {/* Notification Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>

            {/* Profile Section */}
            <div className="flex items-center space-x-2">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Eric Smith</span>
            </div>
          </div>
        </div>
      </header>

      {/* Add Income Modal */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Income</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full p-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full p-2 border rounded"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddIncomeModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Expense Modal */}
      {showRegisterExpenseModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Register Expense</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full p-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full p-2 border rounded"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeRegisterExpenseModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
