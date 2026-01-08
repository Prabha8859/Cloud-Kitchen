import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, value, label, trend, trendValue, iconColor, iconBg, percentage = 75 }) {
  const isPositive = trend === 'up';
  const [count, setCount] = useState(0);
  
  // Calculate circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Animate percentage count
  useEffect(() => {
    let start = 0;
    const end = parseInt(percentage, 10);
    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 2000 / end); // Adjust duration as needed

    return () => clearInterval(timer);
  }, [percentage]);

  const getProgressColor = () => {
    if (percentage < 40) return 'stroke-red-500 dark:stroke-red-400';
    if (percentage < 70) return 'stroke-orange-500 dark:stroke-orange-400';
    return 'stroke-green-500 dark:stroke-green-400';
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up cursor-pointer group">
      <div className="flex items-start justify-between">
        {/* Left Side - Icon and Stats */}
        <div className="flex-1">
          <div className={`inline-flex p-3 rounded-xl ${iconBg} mb-4`}>
            <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
              {trendValue && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-green-50 text-green-500 dark:bg-green-900/20' : 'bg-red-50 text-red-500 dark:bg-red-900/20'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          </div>
        </div>

        {/* Right Side - Circular Progress */}
        <div className="relative w-24 h-24 flex-shrink-0 group/circle">
          <svg className="transform -rotate-90 w-24 h-24">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-gray-100 dark:stroke-slate-700"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`${getProgressColor()} transition-all duration-1000 ease-out`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Percentage Text in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">{count}%</span>
          </div>

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/circle:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {percentage}% Completed
          </div>
        </div>
      </div>
    </div>
  );
}