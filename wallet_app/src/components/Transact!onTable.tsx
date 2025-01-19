import { Transaction } from "../types/transact!on";

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="overflow-x-auto">
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
      {transactions.length === 0 && (
        <p className="text-center py-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsTable;
