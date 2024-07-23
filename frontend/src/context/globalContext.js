import React, { useContext, useMemo, useState } from "react";
import axios from "axios";

const BASE_URL = "https://pj-expense-management.netlify.app/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (response?.status === 200) {
      await getIncomes();
    }
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-income/${id}`);

    if (response?.status === 200) {
      getIncomes();
    }
  };

  const totalIncome = useMemo(() => {
    let total = 0;
    console.log("Total Item called");
    incomes.forEach((income) => {
      total += income?.amount;
    });

    return total;
  }, [incomes]);

  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (response?.status === 200) {
      await getExpenses();
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);

    if (response?.status === 200) {
      getExpenses();
    }
  };

  const totalExpense = useMemo(() => {
    let total = 0;
    console.log("Total Expense called");
    expenses.forEach((expense) => {
      total += expense?.amount;
    });

    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomes, expenses]);

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history?.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
        setError,
        totalBalance,
        transactionHistory,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
