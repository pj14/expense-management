import React, { useContext, useMemo, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

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

  return (
    <GlobalContext.Provider
      value={{ addIncome, getIncomes, incomes, deleteIncome, totalIncome }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
