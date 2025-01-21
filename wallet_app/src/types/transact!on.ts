export interface Transaction {
  id: number;
  date: string; // Use ISO 8601 format for dates, e.g., "2025-01-17"
  account: string; // Account name or type
  category: string;
  account_name: string;
  category_name: string;
  description: string; // Transaction category (e.g., "Food", "Income")
  amount: number; // Positive for income, negative for expenses
}
