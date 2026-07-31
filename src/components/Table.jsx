import { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

function Table({
  setEditingRowID,
  expenses,
  setExpenses,
  setExpense,
  pointerPosition,
  setPointerPosition,
}) {
  const [rowId, setRowId] = useState("");
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);

  const total = filteredData.reduce(
    (acc, expense) => acc + Number(expense.amount),
    0
  );

  // Category badge colors for a modern UI look
  const categoryStyles = {
    grocery: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    clothes: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    bills: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    education: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    medicine: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header section with summary badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Expense Records
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Right-click any entry to manage options.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Spent:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <ContextMenu
        setEditingRowID={setEditingRowID}
        expenses={expenses}
        setExpense={setExpense}
        setExpenses={setExpenses}
        pointerPosition={pointerPosition}
        setPointerPosition={setPointerPosition}
        rowId={rowId}
      />

      {/* Responsive table container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium border-b border-slate-200 dark:border-slate-800">
              {/* Title column */}
              <th className="py-3 px-4">
                <div className="flex items-center justify-between gap-1">
                  <span>Title</span>
                  <button
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Sort A-Z"
                    onClick={() => {
                      setExpenses((prev) =>
                        [...prev].sort((a, b) => a.title.localeCompare(b.title))
                      );
                    }}
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </th>

              {/* Category Dropdown Filter */}
              <th className="py-3 px-4">
                <select
                  className="bg-transparent font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700 rounded px-1 -ml-1 py-0.5 transition-all"
                  onChange={(e) => setQuery(e.target.value)}
                >
                  <option value="" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">All Categories</option>
                  <option value="grocery" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">Grocery</option>
                  <option value="clothes" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">Clothes</option>
                  <option value="bills" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">Bills</option>
                  <option value="education" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">Education</option>
                  <option value="medicine" className="dark:bg-slate-900 text-slate-800 dark:text-slate-100">Medicine</option>
                </select>
              </th>

              {/* Date column */}
              <th className="py-3 px-4">
                <div className="flex items-center justify-between gap-1">
                  <span>Date</span>
                  <div className="flex items-center">
                    <button
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Sort Oldest First"
                      onClick={() => {
                        setExpenses((prev) =>
                          [...prev].sort(
                            (a, b) => new Date(a.date) - new Date(b.date)
                          )
                        );
                      }}
                    >
                      <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Sort Newest First"
                      onClick={() => {
                        setExpenses((prev) =>
                          [...prev].sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                          )
                        );
                      }}
                    >
                      <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>

              {/* Amount column */}
              <th className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>Amount</span>
                  <div className="flex items-center">
                    <button
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Sort Low to High"
                      onClick={() => {
                        setExpenses((prev) =>
                          [...prev].sort((a, b) => Number(a.amount) - Number(b.amount))
                        );
                      }}
                    >
                      <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Sort High to Low"
                      onClick={() => {
                        setExpenses((prev) =>
                          [...prev].sort((a, b) => Number(b.amount) - Number(a.amount))
                        );
                      }}
                    >
                      <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 dark:text-slate-500 italic">
                  No expense records found.
                </td>
              </tr>
            ) : (
              filteredData.map((expense) => {
                const categoryKey = expense.category?.toLowerCase();
                const badgeStyle = categoryStyles[categoryKey] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";

                return (
                  <tr
                    key={expense.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setRowId(expense.id);
                      setPointerPosition({
                        left: e.clientX + 5,
                        top: e.clientY + 5,
                      });
                    }}
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {expense.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 text-xs rounded-full font-medium border ${badgeStyle}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      {expense.date}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                      ${Number(expense.amount).toFixed(2)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Footer showing summary row */}
          <tfoot>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-slate-100">
              <td className="py-3 px-4" colSpan={3}>
                Filtered Total
              </td>
              <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Table;