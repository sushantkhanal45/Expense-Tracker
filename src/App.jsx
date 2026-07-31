import { useState } from "react";
import { getTodayDate } from "./utils/dateUtils";

import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Header from "./components/Header";
import ExpenseData from "./ExpenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", ExpenseData);
  const [pointerPosition, setPointerPosition] = useState({});

  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
    date: getTodayDate(),
  });
  const [editingRowID, setEditingRowID] = useLocalStorage("editingRowID", "");

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200"
      onClick={() => {
        if (pointerPosition.left) {
          setPointerPosition({});
        }
      }}
    >
      {/* Top Navigation / App Header */}
      <Header />

      {/* Main Dashboard Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column (Takes 4 out of 12 columns on desktop) */}
          <div className="lg:col-span-4 w-full">
            <Form
              editingRowID={editingRowID}
              setEditingRowID={setEditingRowID}
              setExpenses={setExpenses}
              expense={expense}
              setExpense={setExpense}
            />
          </div>

          {/* Table Column (Takes 8 out of 12 columns on desktop) */}
          <div className="lg:col-span-8 w-full">
            <Table
              setEditingRowID={setEditingRowID}
              setExpenses={setExpenses}
              expenses={expenses}
              pointerPosition={pointerPosition}
              setPointerPosition={setPointerPosition}
              setExpense={setExpense}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;