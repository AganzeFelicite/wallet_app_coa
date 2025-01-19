import { useState } from "react";
import TransactionsTable from "../components/Transact!onTable";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    account: "",
    category: "",
    date: "",
  });
  const [isLoading] = useState(false);
  const [error] = useState("");

  //   useEffect(() => {
  //     const fetchTransactions = async () => {
  //       setIsLoading(true);
  //       setError("");
  //       try {
  //         const response = await axios.get("/api/transactions", {
  //           params: filters,
  //         });
  //         setTransactions(response.data);
  //       } catch (err) {
  //         setError("Failed to fetch transactions. Please try again later.");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchTransactions();
  //   }, [filters]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      {/* Filters Section */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by account"
          value={filters.account}
          onChange={(e) => setFilters({ ...filters, account: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Search by category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border rounded p-2"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Transactions Table or Loading */}
      {isLoading ? (
        <div className="text-gray-500">Loading transactions...</div>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
