import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../types/transact!on";
import { useAuth } from "../auth/context/AuthContext";
import BASE_URL from "../config";
import { jsPDF } from "jspdf";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuth();

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

    fetchTransactions();
  }, [authToken]);

  // Function to format the date
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 20);

    // Add headers
    doc.setFontSize(12);
    doc.text("ID", 14, 30);
    doc.text("Date", 40, 30);
    doc.text("Account", 70, 30);
    doc.text("Category", 120, 30);
    doc.text("Description", 160, 30);
    doc.text("Amount", 220, 30);

    // Add transaction data
    let yOffset = 40;
    transactions.forEach((transaction) => {
      const amountClass =
        transaction.category_name === "INCOME" ? "income" : "expense";

      doc.text(transaction.id.toString(), 14, yOffset);
      doc.text(formatDate(transaction.date), 40, yOffset);
      doc.text(transaction.account_name, 70, yOffset);
      doc.text(transaction.category_name, 120, yOffset);
      doc.text(transaction.description, 160, yOffset);
      doc.text(transaction.amount.toString(), 220, yOffset);

      yOffset += 10;
    });

    // Save PDF
    doc.save("transaction_report.pdf");
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading transactions...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-center py-4">No transactions found.</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-8">ID</th>
              <th className="py-2 px-6">Date</th>
              <th className="py-2 px-4">Account</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const amountClass =
                transaction.category_name === "INCOME"
                  ? "bg-green-500 text-white font-bold"
                  : "bg-red-500 text-white font-bold";

              return (
                <tr key={transaction.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{transaction.id}</td>
                  <td className="py-2 px-4">{formatDate(transaction.date)}</td>
                  <td className="py-2 px-4">{transaction.account_name}</td>
                  <td className={`py-2 px-4 ${amountClass}`}>
                    {transaction.category_name}
                  </td>
                  <td className="py-2 px-4">{transaction.description}</td>
                  <td className={`py-2 px-4 ${amountClass}`}>
                    {transaction.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
