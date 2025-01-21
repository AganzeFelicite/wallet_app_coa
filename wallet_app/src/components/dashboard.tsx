import { useEffect, useState } from "react";
import TransactionsPage from "./transact";
import AccountAndBudgetPage from "./Account";
import DashboardHeader from "./DashboardHearder";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Plus, Wallet, Clock, PieChart, Settings } from "lucide-react";
import { Transaction } from "../types/transact!on";
import { useAuth } from "../auth/context/AuthContext";
import axios from "axios";
import BASE_URL from "../config";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuth();

  // Fetch transactions data from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Transaction[]>(
          `${BASE_URL}wallet/transactions/`,
          {
            headers: {
              Authorization: `JWT ${authToken}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch transactions."
        );
      } finally {
        setLoading(false);
      }
    };
    console.log(transactions);
    fetchTransactions();
  }, []);

  // Format the fetched transactions for the chart
  const chartData = transactions.map((transaction) => ({
    date: new Date(transaction.date).toLocaleDateString(), // Format date for X axis
    income:
      transaction.category_name === "INCOME"
        ? parseFloat(transaction.amount.toString())
        : 0,
    expense:
      transaction.category_name === "EXPENSE"
        ? parseFloat(transaction.amount.toString())
        : 0,
  }));

  // Calculate the total expenses
  const totalExpenses = transactions
    .filter((transaction) => transaction.category_name === "EXPENSE")
    .reduce(
      (acc, transaction) => acc + parseFloat(transaction.amount.toString()),
      0
    );

  // Function to render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Total Balance",
                  amount: "$5,240.50",
                  change: "+2.3%",
                },
                {
                  title: "Monthly Income",
                  amount: "$3,850.00",
                  change: "+4.1%",
                },
                {
                  title: "Monthly Expenses",
                  amount: `$${totalExpenses.toFixed(2)}`,
                  change: "-1.2%", // Optional: Calculate the change in expenses
                },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                  <div className="flex items-baseline mt-2">
                    <p className="text-2xl font-semibold">{stat.amount}</p>
                    <span
                      className={`ml-2 text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Income/Expense Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Income vs Expenses
                </h3>
                <LineChart width={500} height={300} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#4F46E5"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#EF4444"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>

              {/* Recent Expenses */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Expenses</h3>
                </div>
                <div className="space-y-4">
                  {transactions
                    .filter(
                      (transaction) => transaction.category_name === "EXPENSE"
                    )
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.category_name} • {transaction.date}
                          </p>
                        </div>
                        <span className="font-medium text-red-600">
                          -{transaction.amount}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "transactions":
        return <TransactionsPage />;
      case "accounts":
        return <AccountAndBudgetPage />;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">MY e-Wallet</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: "Dashboard", icon: <PieChart size={20} /> },
            { name: "Transactions", icon: <Clock size={20} /> },
            { name: "Accounts", icon: <Wallet size={20} /> },
            { name: "Settings", icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
                activeMenu === item.name.toLowerCase()
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }`}
              onClick={() => setActiveMenu(item.name.toLowerCase())}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        {/* Header */}
        <DashboardHeader />
        {/* Dashboard Content */}
        {renderContent()}
      </div>
    </div>
  );
}
