import React from "react";

function Input({ type, label, id, name, value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col w-full gap-1.5 mb-5">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="relative w-full">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:ring-2 ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200"
              : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-slate-400 dark:hover:border-slate-600"
          }`}
        />
      </div>

      {/* Validation Error Message */}
      {error && (
        <p className="text-xs font-medium text-rose-500 dark:text-rose-400 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;