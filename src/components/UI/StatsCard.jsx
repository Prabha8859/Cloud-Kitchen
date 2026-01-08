import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendValue, 
  percentage = 75, 
  color = 'primary' // Default to primary theme
}) {
  const isPositive = trend === 'up';
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Unified Color System based on props
  const colorMap = {
    primary: { // Orange
      icon: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      stroke: 'stroke-orange-600 dark:stroke-orange-400',
      track: 'stroke-orange-100 dark:stroke-orange-900/30'
    },
    secondary: { // Blue
      icon: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      stroke: 'stroke-blue-600 dark:stroke-blue-400',
      track: 'stroke-blue-100 dark:stroke-blue-900/30'
    },
    success: { // Green
      icon: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      stroke: 'stroke-emerald-600 dark:stroke-emerald-400',
      track: 'stroke-emerald-100 dark:stroke-emerald-900/30'
    },
    danger: { // Red
      icon: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      stroke: 'stroke-red-600 dark:stroke-red-400',
      track: 'stroke-red-100 dark:stroke-red-900/30'
    },
    info: { // Teal/Cyan
      icon: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      stroke: 'stroke-cyan-600 dark:stroke-cyan-400',
      track: 'stroke-cyan-100 dark:stroke-cyan-900/30'
    }
  };

  const theme = colorMap[color] || colorMap.primary;

  return (
    <div className="card-base card-hover cursor-pointer group animate-fade-in-up">
      <div className="flex items-center justify-between">
        {/* Left Side: Stats Information */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          
          {/* Trend Indicator */}
          {trendValue && (
            <div className={`flex items-center gap-1 text-xs font-bold mt-2 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Right Side: Icon with Progress Ring */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className={`${theme.bg} rounded-full p-3 z-10 transition-colors duration-300`}>
            <Icon className={`w-6 h-6 ${theme.icon}`} strokeWidth={2} />
          </div>
          
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r={radius} className={`${theme.track} transition-colors duration-300`} strokeWidth="3" fill="none" />
            <circle
              cx="32"
              cy="32"
              r={radius}
              className={`${theme.stroke} transition-all duration-1000 ease-out`}
              strokeWidth="3"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}