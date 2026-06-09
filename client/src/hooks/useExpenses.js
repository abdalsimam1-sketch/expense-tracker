import { useEffect, useMemo, useState } from "react";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../services/expenseServices";

import { formatCurrency } from "../util/formatCurrency";

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

export const useExpenses = (filter, customRange) => {
  //state varibles
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addExpenseForm, setAddExpenseForm] = useState(FORMSHAPE);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => Number(sum) + Number(expense.amount),
      0,
    );
  }, [expenses]);
  const count = useMemo(() => {
    return expenses.length;
  }, [expenses]);
  const topCategory = "Utilities";

  const stats = [
    { label: "Total Spent", value: formatCurrency(totalSpent) },
    { label: "Count", value: count },
    { label: "Top Category", value: topCategory },
  ];
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

  const handleFetch = async () => {
    const data = await getExpenses(
      filter,
      customRange.startDate,
      customRange.endDate,
    );
    console.log(data.data);

    setExpenses(data.data);
  };
  const handleCreate = async (payload) => {
    const response = await createExpense(payload);
    toggleAddModal();
    setAddExpenseForm(FORMSHAPE);
    handleFetch();
    return response.data;
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    handleFetch();
  };

  const handleEdit = async (id, payload) => {
    await updateExpense(id, payload);
    handleFetch();
  };

  useEffect(() => {
    handleFetch();
  }, [filter, customRange]);

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
    handleCreate,
    handleDelete,
    handleEdit,
  };
};
