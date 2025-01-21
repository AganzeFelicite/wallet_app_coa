import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useAuth } from "../auth/context/AuthContext";

interface Account {
  name: string;
  type: string;
  balance: number;
}

interface Budget {
  accountName: string;
  amount: number;
}

interface Category {
  id: number;
  name: string;
}

const AccountAndBudgetPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { authToken, user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newAccount, setNewAccount] = useState<Account>({
    name: "",
    type: "",
    balance: 0,
  });
  const [newBudget, setNewBudget] = useState<Budget>({
    accountName: "",
    amount: 0,
  });
  const [newCategory, setNewCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [authToken]);

  const handleAddAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}wallet/accounts/`,
        {
          name: newAccount.name,
          account_type: newAccount.type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      setAccounts([...accounts, response.data]);
      setNewAccount({ name: "", type: "", balance: 0 });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}wallet/budgets/`,
        {
          user: user?.id,
          category: 1, // Replace with the appropriate category ID
          amount: newBudget.amount,
          start_date: "2025-01-01",
          end_date: "2025-01-31",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      setBudgets([
        ...budgets,
        { accountName: newBudget.accountName, amount: response.data.amount },
      ]);
      setNewBudget({ accountName: "", amount: 0 });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to set budget.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}wallet/categories/`,
        {
          name: newCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authToken}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Create Account, Budget, and Categories
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Create a New Account</h3>
        <input
          type="text"
          placeholder="Account Name"
          value={newAccount.name}
          onChange={(e) =>
            setNewAccount({ ...newAccount, name: e.target.value })
          }
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Account Type (e.g., Bank, Mobile Money)"
          value={newAccount.type}
          onChange={(e) =>
            setNewAccount({ ...newAccount, type: e.target.value })
          }
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddAccount}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Account"}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Set Budget for an Account</h3>
        <select
          value={newBudget.accountName}
          onChange={(e) =>
            setNewBudget({ ...newBudget, accountName: e.target.value })
          }
          className="p-2 border rounded w-full mb-2"
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.name} value={account.name}>
              {account.name} ({account.type})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Budget Amount"
          value={newBudget.amount}
          onChange={(e) =>
            setNewBudget({ ...newBudget, amount: Number(e.target.value) })
          }
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddBudget}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Setting..." : "Set Budget"}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Create a New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Category"}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Created Categories</h3>
        <ul className="list-disc pl-6 mb-6">
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>

        <h3 className="text-xl font-medium mb-4">Created Accounts</h3>
        <ul className="list-disc pl-6 mb-6">
          {accounts.map((account) => (
            <li key={account.name}>
              {account.name} - {account.type} - Balance: ${account.balance}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-medium mb-4">Set Budgets</h3>
        <ul className="list-disc pl-6">
          {budgets.map((budget, index) => (
            <li key={index}>
              {budget.accountName}: ${budget.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountAndBudgetPage;
