import { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';

export default function Overview() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const orderData = [
    { label: 'On Delivery', value: 25, color: 'stroke-blue-500 dark:stroke-blue-400', track: 'stroke-blue-100 dark:stroke-blue-900/30' },
    { label: 'Delivered', value: 85, color: 'stroke-green-500 dark:stroke-green-400', track: 'stroke-green-100 dark:stroke-green-900/30' },
    { label: 'Cancelled', value: 7, color: 'stroke-red-500 dark:stroke-red-400', track: 'stroke-red-100 dark:stroke-red-900/30' }
  ];

  const pieData = [
    { label: 'Morning', value: 28, color: 'bg-purple-600', stroke: 'stroke-purple-600' },
    { label: 'Afternoon', value: 35, color: 'bg-purple-400', stroke: 'stroke-purple-400' },
    { label: 'Evening', value: 37, color: 'bg-cyan-400', stroke: 'stroke-cyan-400' }
  ];

  // Data used for the chart animation (starts at 0, then transitions to actual values)
  const chartData = isVisible ? pieData : pieData.map(item => ({ ...item, value: 0 }));

  const CircularProgress = ({ percentage, label, colorClass, trackColorClass }) => {
    const radius = 30;
    const strokeWidth = 6;
    const boxSize = 66;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex items-center gap-4 group cursor-pointer w-full p-2 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors">
        <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ width: boxSize, height: boxSize }}>
          <svg className="transform -rotate-90 w-full h-full drop-shadow-sm">
            <circle
              cx={boxSize / 2}
              cy={boxSize / 2}
              r={radius}
              className={`${trackColorClass || 'stroke-gray-100 dark:stroke-slate-700'} transition-colors duration-300`}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={boxSize / 2}
              cy={boxSize / 2}
              r={radius}
              className={`${colorClass} transition-all duration-1000 ease-out`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {percentage}%
            </span>
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-auto">{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 h-full animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        
        {/* Left: Order Summary */}
        <div className="flex flex-col lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-700 pb-2 lg:pb-0 lg:pr-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-bold text-gray-900 dark:text-white">Order Summary</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              {selectedPeriod}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex flex-col justify-around flex-1 gap-2">
            {orderData.map((item, index) => (
              <CircularProgress 
                key={index}
                percentage={isVisible ? item.value : 0} 
                label={item.label} 
                colorClass={item.color} 
                trackColorClass={item.track}
              />
            ))}
          </div>
        </div>

        {/* Right: Overview */}
        <div className="flex flex-col lg:col-span-2 pt-6 lg:pt-0 lg:pl-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overview</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <Download className="w-3.5 h-3.5" />
                Report
              </button>
              <button className="text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">View All</button>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">The top ordered menu this week</p>

          <div className="flex items-center justify-between flex-1 gap-6">
            {/* Pie Chart */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                {chartData.map((item, index) => {
                  const totalPercentage = chartData.slice(0, index).reduce((acc, curr) => acc + curr.value, 0);
                  const radius = 50;
                  const circumference = 2 * Math.PI * radius;
                  const offset = circumference - (item.value / 100) * circumference;
                  const rotation = (totalPercentage / 100) * 360;

                  return (
                    <circle
                      key={index}
                      cx="60"
                      cy="60"
                      r={radius}
                      className={`${item.stroke} transition-all duration-1000`}
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      transform={`rotate(${rotation} 60 60)`}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">52%</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 flex-1">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}