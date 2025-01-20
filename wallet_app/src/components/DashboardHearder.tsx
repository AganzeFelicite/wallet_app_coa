import { useEffect, useState } from "react";
import { Bell } from "react-feather";

import { fetchAccounts, Account } from "../utils/api";

// interface TransactionFormData {
//   account: number;
//   category: number;
//   transaction_type: "INCOME" | "EXPENSE";
//   amount: string;
//   description: string;
//   date: string;
// }

const DashboardHeader = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showRegisterExpenseModal, setShowRegisterExpenseModal] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
        console.log("Accounts fetched:", data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchData();
  }, []);
  // Form states for Income

  // Toggle functions for modals
  const openAddIncomeModal = () => setShowAddIncomeModal(true);
  const closeAddIncomeModal = () => setShowAddIncomeModal(false);
  const openRegisterExpenseModal = () => setShowRegisterExpenseModal(true);
  const closeRegisterExpenseModal = () => setShowRegisterExpenseModal(false);

  //   // Handle Income Form Submit
  //   const handleIncomeSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post(
  //         "YOUR_API_ENDPOINT/transactions/",
  //         incomeForm
  //       );
  //       console.log("Income added:", response.data);
  //       closeAddIncomeModal();
  //       // Add success notification here
  //     } catch (error) {
  //       console.error("Error adding income:", error);
  //       // Add error notification here
  //     }
  //   };

  //   // Handle Expense Form Submit
  //   const handleExpenseSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post(
  //         "YOUR_API_ENDPOINT/transactions/",
  //         expenseForm
  //       );
  //       console.log("Expense added:", response.data);
  //       closeRegisterExpenseModal();
  //       // Add success notification here
  //     } catch (error) {
  //       console.error("Error adding expense:", error);
  //       // Add error notification here
  //     }
  //   };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 rounded-lg hover:bg-green-600 bg-green-500 text-white"
              onClick={openAddIncomeModal}
            >
              Add Income
            </button>

            <button
              className="px-4 py-2 rounded-lg hover:bg-red-600 bg-red-500 text-white"
              onClick={openRegisterExpenseModal}
            >
              Register Expenses
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
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
                <label
                  htmlFor="income-amount"
                  className="block text-gray-700 mb-2"
                >
                  Account
                </label>
                <select>
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.balance}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="income-amount"
                  className="block text-gray-700 mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="income-amount"
                  className="w-full p-2 border rounded"
                  //   value={incomeForm.amount}
                  //   onChange={(e) =>
                  //     setIncomeForm({ ...incomeForm, amount: e.target.value })
                  //   }
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="income-description"
                  className="block text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="income-description"
                  className="w-full p-2 border rounded"
                  //   value={incomeForm.description}
                  //   onChange={(e) =>
                  //     setIncomeForm({
                  //       ...incomeForm,
                  //       description: e.target.value,
                  //     })
                  //   }
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="income-date"
                  className="block text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  type="datetime-local"
                  id="income-date"
                  className="w-full p-2 border rounded"
                  //   value={incomeForm.date.slice(0, 16)}
                  //   onChange={(e) =>
                  //     setIncomeForm({
                  //       ...incomeForm,
                  //       date: new Date(e.target.value).toISOString(),
                  //     })
                  //   }
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddIncomeModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
                <label
                  htmlFor="expense-amount"
                  className="block text-gray-700 mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="expense-amount"
                  className="w-full p-2 border rounded"
                  //   value={expenseForm.amount}
                  //   onChange={(e) =>
                  //     setExpenseForm({ ...expenseForm, amount: e.target.value })
                  //   }
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expense-description"
                  className="block text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="expense-description"
                  className="w-full p-2 border rounded"
                  //   value={expenseForm.description}
                  //   onChange={(e) =>
                  //     setExpenseForm({
                  //       ...expenseForm,
                  //       description: e.target.value,
                  //     })
                  //   }
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expense-date"
                  className="block text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  type="datetime-local"
                  id="expense-date"
                  className="w-full p-2 border rounded"
                  //   value={expenseForm.date.slice(0, 16)}
                  //   onChange={(e) =>
                  //     setExpenseForm({
                  //       ...expenseForm,
                  //       date: new Date(e.target.value).toISOString(),
                  //     })
                  //   }
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeRegisterExpenseModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
