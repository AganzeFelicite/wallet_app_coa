import { useState } from "react";
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
import {
  Bell,
  Plus,
  Wallet,
  Clock,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react";

const mockTransactionData = [
  { name: "Jan", expenses: 4000, income: 4400 },
  { name: "Feb", expenses: 3000, income: 4200 },
  { name: "Mar", expenses: 2000, income: 3800 },
  { name: "Apr", expenses: 2780, income: 3908 },
  { name: "May", expenses: 1890, income: 4800 },
  { name: "Jun", expenses: 2390, income: 3800 },
];

const mockTransactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -120.5,
    category: "Food",
    date: "2025-01-17",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 3500.0,
    category: "Income",
    date: "2025-01-15",
  },
  {
    id: 3,
    description: "Internet Bill",
    amount: -59.99,
    category: "Utilities",
    date: "2025-01-14",
  },
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

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
                  amount: "$2,150.30",
                  change: "-1.2%",
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
                <LineChart width={500} height={300} data={mockTransactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#4F46E5" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" />
                </LineChart>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Transactions</h3>
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <Plus size={16} className="mr-1" />
                    Add New
                  </button>
                </div>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                      <span
                        className={`font-medium ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toFixed(2)}
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
