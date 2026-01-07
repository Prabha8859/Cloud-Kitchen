import React from "react";
import PropTypes from "prop-types";

export default function PageHeader({ title, subtitle, rightContent }) {
  return (
    <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-300 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{subtitle}</p>}
      </div>
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightContent: PropTypes.node,
};
