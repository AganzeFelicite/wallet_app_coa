import React, { useState } from "react";

interface Account {
  name: string;
  type: string;
  balance: number;
}

interface Budget {
  accountName: string;
  amount: number;
}

const AccountAndBudgetPage = () => {
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

  const handleAddAccount = () => {
    setAccounts([...accounts, newAccount]);
    setNewAccount({ name: "", type: "", balance: 0 });
  };

  const handleAddBudget = () => {
    setBudgets([...budgets, newBudget]);
    setNewBudget({ accountName: "", amount: 0 });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Create Account and Set Budget
      </h2>

      {/* Create Account Form */}
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
        <input
          type="number"
          placeholder="Balance"
          value={newAccount.balance}
          onChange={(e) =>
            setNewAccount({ ...newAccount, balance: Number(e.target.value) })
          }
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddAccount}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Account
        </button>
      </div>

      {/* Set Budget Form */}
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
        >
          Set Budget
        </button>
      </div>

      {/* Display Created Accounts and Budgets */}
      <div>
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
          {budgets.map((budget) => (
            <li key={budget.accountName}>
              {budget.accountName}: ${budget.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountAndBudgetPage;
