import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ icon: Icon, className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        className={`
          w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 
          rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
          transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400
          ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
        `}
        {...props}
      />
    </div>
  );
}

Input.propTypes = {
  icon: PropTypes.elementType,
  className: PropTypes.string,
};