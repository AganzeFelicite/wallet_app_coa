import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../types/transact!on";
import { useAuth } from "../auth/context/AuthContext";
import BASE_URL from "../config";

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
          BASE_URL + "wallet/transactions/",
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

  return (
    <div className="overflow-x-auto">
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
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Account</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">{transaction.account}</td>
                <td className="py-2 px-4">{transaction.category}</td>
                <td className="py-2 px-4">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
