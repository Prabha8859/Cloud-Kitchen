import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export default function Badge({ status, children, className = '' }) {
  // Normalize status to lowercase for matching
  const normalizedStatus = status?.toLowerCase() || 'default';

  const styles = {
    active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50",
    completed: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50",
    preparing: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50",
    inactive: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-700 dark:text-gray-400 dark:border-slate-600",
    cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50",
  };

  const icons = {
    active: CheckCircle,
    completed: CheckCircle,
    pending: Clock,
    preparing: Clock,
    inactive: XCircle,
    cancelled: XCircle,
  };

  const Icon = icons[normalizedStatus] || AlertCircle;
  const styleClass = styles[normalizedStatus] || styles.inactive;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${styleClass} ${className}`}>
      <Icon size={12} />
      <span className="capitalize">{children || status}</span>
    </span>
  );
}

Badge.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};