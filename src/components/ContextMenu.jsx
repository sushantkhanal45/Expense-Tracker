import React from "react";

function ContextMenu({
  setEditingRowID,
  pointerPosition,
  setPointerPosition,
  setExpenses,
  expenses,
  setExpense,
  rowId,
}) {
  if (!pointerPosition.left) return null;

  const handleEdit = () => {
    setPointerPosition({});
    const expenseToEdit = expenses.find((expense) => expense.id === rowId);
    if (expenseToEdit) {
      setEditingRowID(expenseToEdit.id);
      setExpense(expenseToEdit);
    }
  };

  const handleDelete = () => {
    setExpenses((prev) => prev.filter((data) => data.id !== rowId));
    setPointerPosition({});
  };

  return (
    <div
      style={{
        left: `${pointerPosition.left}px`,
        top: `${pointerPosition.top}px`,
      }}
      className="fixed z-50 min-w-[140px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5 animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Edit Option */}
      <button
        type="button"
        className="w-full px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2.5 transition-colors text-left"
        onClick={handleEdit}
      >
        <svg
          className="w-4 h-4 text-slate-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit Entry
      </button>

      {/* Divider line */}
      <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

      {/* Delete Option */}
      <button
        type="button"
        className="w-full px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 transition-colors text-left"
        onClick={handleDelete}
      >
        <svg
          className="w-4 h-4 text-rose-500 dark:text-rose-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete Entry
      </button>
    </div>
  );
}

export default ContextMenu;