import { useState } from "react";

const MODES = {
  ADD: "add",
  EDIT: "edit",
};
const FORMSHAPE = {
  description: "",
  amount: "",
  category: "",
  expense_date: "",
};
const expenses = [
  {
    expense_id: 1,
    description: "Bought data",
    amount: 2500,
    category: "Utility",
    expense_date: "2026-05-01",
  },
  {
    expense_id: 2,
    description: "Shawarma",
    amount: 3500,
    category: "Food",
    expense_date: "2026-05-10",
  },
  {
    expense_id: 3,
    description: "Uber ride",
    amount: 1800,
    category: "Transport",
    expense_date: "2026-05-15",
  },
  {
    expense_id: 4,
    description: "Netflix sub",
    amount: 5000,
    category: "Entertainment",
    expense_date: "2026-05-20",
  },
  {
    expense_id: 5,
    description: "Electricity bill",
    amount: 8000,
    category: "Utility",
    expense_date: "2026-05-28",
  },
];

export const useExpenses = () => {
  //const [expenses, setExpenses] = useState([]);
  const totalSpent = 10000;
  const count = 3;
  const topCategory = "Utilities";

  const stats = [
    { label: "Total Spent", value: totalSpent },
    { label: "Count", value: count },
    { label: "Top Category", value: topCategory },
  ];

  //state varibles
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addExpenseForm, setAddExpenseForm] = useState(FORMSHAPE);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const toggleAddModal = () => {
    setAddModalOpen(addModalOpen === true ? false : true);
  };
  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setAddExpenseForm({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      expense_date: expense.expense_date,
    });
  };
  const closeEditModal = () => {
    setSelectedExpense(null);
    setAddExpenseForm(FORMSHAPE);
  };

  return {
    stats,
    expenses,
    addModalOpen,
    toggleAddModal,
    addExpenseForm,
    setAddExpenseForm,
    MODES,
    selectedExpense,
    openEditModal,
    closeEditModal,
  };
};
