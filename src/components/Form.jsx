import React, { useState } from "react";
import Input from "./Input";
import SelectOption from "./SelectOption";
import { getTodayDate } from "../utils/dateUtils";

function Form({
  setExpenses,
  expense,
  setExpense,
  editingRowID,
  setEditingRowID,
}) {
  const [error, setError] = useState({});

  const validationConfig = {
    title: [{ required: true, message: "Title is required" }],
    category: [{ required: true, message: "Category is required" }],
    amount: [
      { required: true, message: "Amount is required" },
      { pattern: /^\d+(\.\d+)?$/, message: "Enter a valid number" },
      { positiveValue: true, message: "Enter a positive value" },
    ],
    date: [{ required: true, message: "Date is required" }],
    id: [],
  };

  const validate = (formData) => {
    let errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!validationConfig[key]) return;

      validationConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errors[key] = rule.message;
        }
        if (rule.pattern && value && !rule.pattern.test(value)) {
          errors[key] = rule.message;
        }
        if (rule.positiveValue && value && Number(value) <= 0) {
          errors[key] = rule.message;
        }
      });
    });

    setError(errors);
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({ ...prev, [name]: null }));
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowID) {
      setExpenses((prev) =>
        prev.map((expenseEle) =>
          expenseEle.id === editingRowID
            ? { ...expense, id: editingRowID }
            : expenseEle
        )
      );
      setEditingRowID("");
    } else {
      setExpenses((prev) => [
        ...prev,
        { ...expense, id: crypto.randomUUID() },
      ]);
    }

    // Reset form after submit
    setExpense({
      title: "",
      category: "",
      amount: "",
      date: getTodayDate(),
    });
    setError({});
  };

  const handleCancelEdit = () => {
    setEditingRowID("");
    setExpense({
      title: "",
      category: "",
      amount: "",
      date: getTodayDate(),
    });
    setError({});
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {editingRowID ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {editingRowID
              ? "Update entry details below"
              : "Track a new transaction"}
          </p>
        </div>

        {editingRowID && (
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Editing
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        {/* Title Field */}
        <Input
          type="text"
          label="Title"
          id="title"
          name="title"
          placeholder="e.g., Grocery Shopping"
          value={expense.title}
          onChange={handleChange}
          error={error.title}
        />

        {/* Category Dropdown */}
        <SelectOption
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          error={error.category}
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          defaultOption="Select Category"
        />

        {/* Amount Field */}
        <Input
          type="text"
          label="Amount ($)"
          id="amount"
          name="amount"
          placeholder="0.00"
          value={expense.amount}
          onChange={handleChange}
          error={error.amount}
        />

        {/* Date Field */}
        <Input
          type="date"
          label="Date"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          error={error.date}
        />

        {/* Form Action Buttons */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            className={`flex-1 py-2.5 px-4 text-white font-medium text-sm rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 ${
              editingRowID
                ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 focus:ring-emerald-500/20"
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500/20"
            }`}
          >
            {editingRowID ? "Save Changes" : "Add Expense"}
          </button>

          {editingRowID && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;