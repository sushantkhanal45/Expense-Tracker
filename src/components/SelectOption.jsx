import React from "react";

function SelectOption({
  label,
  id,
  name,
  value,
  onChange,
  options,
  defaultOption,
  error,
}) {
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

      {/* Select Box Wrapper */}
      <div className="relative w-full">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 transition-all outline-none focus:ring-2 cursor-pointer ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-slate-400 dark:hover:border-slate-600"
          }`}
        >
          {defaultOption && (
            <option value="" disabled hidden>
              {defaultOption}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        {/* Custom Chevron Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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

export default SelectOption;