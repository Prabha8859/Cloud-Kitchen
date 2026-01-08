import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, value, label, trend, trendValue, iconColor, iconBg, percentage = 75, color }) {
  const isPositive = trend === 'up';
  
  // Configuration for the circular progress
  // Radius 28px fits well within a 64px (w-16) container with 3px stroke
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine the color theme
  // 1. Use 'color' prop if provided (e.g., 'blue', 'orange')
  // 2. Else, determine color dynamically based on percentage
  // 3. Fallback to extracting from iconColor or default to blue
  let themeColor = color;
  
  if (!themeColor && !iconColor) {
    if (percentage >= 80) themeColor = 'green';
    else if (percentage >= 60) themeColor = 'blue';
    else if (percentage >= 40) themeColor = 'orange';
    else themeColor = 'red';
  }

  // Color Mapping for unified styling (Icon, Background, Ring, Track)
  const colorStyles = {
    blue: {
      icon: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      stroke: 'stroke-blue-600 dark:stroke-blue-400',
      track: 'stroke-blue-100 dark:stroke-blue-900/30'
    },
    green: {
      icon: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      stroke: 'stroke-emerald-600 dark:stroke-emerald-400',
      track: 'stroke-emerald-100 dark:stroke-emerald-900/30'
    },
    orange: {
      icon: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      stroke: 'stroke-orange-600 dark:stroke-orange-400',
      track: 'stroke-orange-100 dark:stroke-orange-900/30'
    },
    red: {
      icon: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      stroke: 'stroke-red-600 dark:stroke-red-400',
      track: 'stroke-red-100 dark:stroke-red-900/30'
    },
    purple: {
      icon: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      stroke: 'stroke-purple-600 dark:stroke-purple-400',
      track: 'stroke-purple-100 dark:stroke-purple-900/30'
    },
    indigo: {
      icon: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      stroke: 'stroke-indigo-600 dark:stroke-indigo-400',
      track: 'stroke-indigo-100 dark:stroke-indigo-900/30'
    },
    pink: {
      icon: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      stroke: 'stroke-pink-600 dark:stroke-pink-400',
      track: 'stroke-pink-100 dark:stroke-pink-900/30'
    },
    yellow: {
      icon: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      stroke: 'stroke-yellow-600 dark:stroke-yellow-400',
      track: 'stroke-yellow-100 dark:stroke-yellow-900/30'
    },
    teal: {
      icon: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      stroke: 'stroke-teal-600 dark:stroke-teal-400',
      track: 'stroke-teal-100 dark:stroke-teal-900/30'
    }
  };

  // Select styles based on themeColor, or fallback to legacy props
  const currentStyle = colorStyles[themeColor] || {
    icon: iconColor || 'text-blue-600',
    bg: iconBg || 'bg-blue-50',
    stroke: iconColor ? iconColor.replace(/text-/g, 'stroke-') : 'stroke-blue-600',
    track: 'stroke-gray-100 dark:stroke-slate-700'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up cursor-pointer group">
      <div className="flex items-center justify-between">
        {/* Left Side: Stats Information */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          
          {/* Trend Indicator */}
          {trendValue && (
            <div className={`flex items-center gap-1 text-xs font-bold mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Right Side: Icon with Progress Ring */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Icon with Background */}
          <div className={`${currentStyle.bg} rounded-full p-3 z-10 transition-colors duration-300`}>
            <Icon className={`w-6 h-6 ${currentStyle.icon}`} strokeWidth={2} />
          </div>
          
          {/* Progress Ring SVG */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              className={`${currentStyle.track} transition-colors duration-300`}
              strokeWidth="3"
              fill="none"
            />
            {/* Progress Indicator */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              className={`${currentStyle.stroke} transition-all duration-1000 ease-out`}
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