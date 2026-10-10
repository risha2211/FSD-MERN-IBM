
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  expenseSummaryData as summaryData,
  expenseData,
  expenseCategories as categoriesData,
} from "../data";

// Create the application context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [month, setMonth] = useState("2020-01");
  const [expenseSummaryData, setExpenseSummaryData] = useState(null);
  const [expenseDetailsData, setExpenseDetailsData] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState(null);
  const [expenseIdToBeDeleted, setExpenseIdToBeDeleted] = useState(null);

  // Fetch expense categories
  const fetchExpenseCategories = () => {
    setExpenseCategories(categoriesData.categories);
  };

  // Fetch expense and summary data
  const fetchExpenseData = () => {
    setExpenseSummaryData(summaryData);
    setTotalExpenses(expenseData.totalExpenses);
    setExpenseDetailsData(expenseData.expenses);
  };

  // Fetch expense data when the month changes
  useEffect(() => {
    fetchExpenseData();
  }, [month]);

  // Fetch categories on initial render
  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        month,
        expenseSummaryData,
        expenseDetailsData,
        totalExpenses,
        expenseCategories,
        expenseIdToBeDeleted,
        setMonth,
        setExpenseIdToBeDeleted,
        fetchExpenseData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
