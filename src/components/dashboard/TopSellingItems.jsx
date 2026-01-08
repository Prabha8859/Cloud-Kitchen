import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function TopSellingItems() {
  const items = [
    { name: 'King Burger', count: 100, image: '🍔', price: '$12.00' },
    { name: 'Chicken Noodles', count: 150, image: '🍜', price: '$15.50', isNew: true },
    { name: 'Hot & Sour Soup', count: 80, image: '🍲', price: '$8.99' },
    { name: 'Cheese Pizza', count: 120, image: '🍕', price: '$18.00' },
    { name: 'Sushi Platter', count: 65, image: '🍱', price: '$24.00', isNew: true },
    { name: 'Grilled Chicken', count: 95, image: '🍗', price: '$14.00' },
    { name: 'Caesar Salad', count: 70, image: '🥗', price: '$9.99' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const ITEM_HEIGHT = 72; // Item height (60px) + gap (12px)
  const VISIBLE_COUNT = 3;
  const TOTAL_ITEMS = items.length;
  
  const displayItems = [...items, ...items.slice(0, VISIBLE_COUNT)];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (currentIndex === TOTAL_ITEMS) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, TOTAL_ITEMS]);

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Selling Items</h3>
        <button className="text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-1 transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">The top ordered menu this week</p>

      <div className="overflow-hidden relative" style={{ height: `${ITEM_HEIGHT * VISIBLE_COUNT}px` }}>
        <div 
          className={`flex flex-col ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateY(-${currentIndex * ITEM_HEIGHT}px)` }}
        >
          {displayItems.map((item, index) => (
            <div key={index} style={{ height: `${ITEM_HEIGHT}px` }} className="pb-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-slate-600 group cursor-pointer h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10 rounded-lg flex items-center justify-center text-lg shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    {item.image}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-xs">{item.name}</h4>
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[8px] font-bold leading-none shadow-sm">New</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">{item.count}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">orders</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}