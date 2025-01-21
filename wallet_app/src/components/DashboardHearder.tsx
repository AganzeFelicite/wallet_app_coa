import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import BASE_URL from "../config";
import { useAuth } from "../auth/context/AuthContext";

// Define interfaces for our data types
interface Account {
  id: number;
  name: string;
  account_type: string;
  balance: string;
}

interface Category {
  id: number;
  name: string;
  parent: string;
}

interface TransactionFormData {
  account: number;
  category: string | number;
  transaction_type: "INCOME" | "EXPENSE";
  amount: string;
  description: string;
  date: string;
}

const DashboardHeader = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showRegisterExpenseModal, setShowRegisterExpenseModal] =
    useState(false);
  const { authToken } = useAuth();
  // Form states
  const [incomeForm, setIncomeForm] = useState<TransactionFormData>({
    account: 0,
    category: 1,
    transaction_type: "INCOME",
    amount: "",
    description: "",
    date: new Date().toISOString(),
  });

  const [expenseForm, setExpenseForm] = useState<TransactionFormData>({
    account: 0,
    category: 1,
    transaction_type: "EXPENSE",
    amount: "",
    description: "",
    date: new Date().toISOString(),
  });

  // Fetch both accounts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch accounts
        const accountsResponse = await fetch(BASE_URL + "wallet/accounts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
          },
        });

        if (!accountsResponse.ok) {
          throw new Error(`HTTP error! status: ${accountsResponse.status}`);
        }

        const accountsData = await accountsResponse.json();
        setAccounts(accountsData);

        // Fetch categories
        const categoriesResponse = await fetch(
          BASE_URL + "wallet/categories/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${authToken}`,
            },
          }
        );

        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
        }

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle functions for modals
  const openAddIncomeModal = () => setShowAddIncomeModal(true);
  const closeAddIncomeModal = () => setShowAddIncomeModal(false);
  const openRegisterExpenseModal = () => setShowRegisterExpenseModal(true);
  const closeRegisterExpenseModal = () => setShowRegisterExpenseModal(false);

  // Handle transaction submission
  const submitTransaction = async (formData: TransactionFormData) => {
    console.log("Submitting transaction:", formData);
    try {
      const response = await fetch(BASE_URL + "wallet/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Refresh accounts after transaction
      const accountsResponse = await fetch(BASE_URL + "wallet/accounts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authToken}`,
        },
      });

      const accountsData = await accountsResponse.json();
      setAccounts(accountsData);

      return data;
    } catch (error) {
      console.error("Transaction submission error:", error);
      throw error;
    }
  };

  // Handle Income Form Submit
  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTransaction(incomeForm);
      closeAddIncomeModal();
      // Reset form
      setIncomeForm({
        account: 0,
        category: 1,
        transaction_type: "INCOME",
        amount: "",
        description: "",
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  // Handle Expense Form Submit
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTransaction(expenseForm);
      closeRegisterExpenseModal();
      // Reset form
      setExpenseForm({
        account: 0,
        category: 1,
        transaction_type: "EXPENSE",
        amount: "",
        description: "",
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

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
            <form onSubmit={handleIncomeSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="income-account"
                  className="block text-gray-700 mb-2"
                >
                  Account
                </label>
                <select
                  id="income-account"
                  className="w-full p-2 border rounded"
                  value={incomeForm.account}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      account: Number(e.target.value),
                    })
                  }
                  required
                >
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
                  htmlFor="income-category"
                  className="block text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="income-category"
                  className="w-full p-2 border rounded"
                  value={incomeForm.category}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      category: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
                  value={incomeForm.amount}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, amount: e.target.value })
                  }
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
                  value={incomeForm.description}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      description: e.target.value,
                    })
                  }
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
                  value={incomeForm.date.slice(0, 16)}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      date: new Date(e.target.value).toISOString(),
                    })
                  }
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
            <form onSubmit={handleExpenseSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="expense-account"
                  className="block text-gray-700 mb-2"
                >
                  Account
                </label>
                <select
                  id="expense-account"
                  className="w-full p-2 border rounded"
                  value={expenseForm.account}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      account: Number(e.target.value),
                    })
                  }
                  required
                >
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
                  htmlFor="expense-category"
                  className="block text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="expense-category"
                  className="w-full p-2 border rounded"
                  value={expenseForm.category}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      category: Number(e.target.value),
                    })
                  }
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e.target.value })
                  }
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
                  value={expenseForm.description}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      description: e.target.value,
                    })
                  }
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
                  value={expenseForm.date.slice(0, 16)}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      date: new Date(e.target.value).toISOString(),
                    })
                  }
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
