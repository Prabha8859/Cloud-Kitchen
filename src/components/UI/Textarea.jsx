import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`
        w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 
        rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
        transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400
        px-4 py-2.5
      `}
      rows="4"
      {...props}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
};