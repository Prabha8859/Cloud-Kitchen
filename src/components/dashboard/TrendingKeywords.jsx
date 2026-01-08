export default function TrendingKeywords() {
  const keywords = [
    { tag: '#paneer', count: 420 },
    { tag: '#breakfast', count: 150 },
    { tag: '#tea', count: 120 }
  ];

  const otherTags = ['#panjabifood', '#chainissfood', '#pizza', '#burgar', '#coffee', '20+'];

  const getBarWidth = (count) => {
    const maxCount = 420;
    return `${(count / maxCount) * 100}%`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full animate-fade-in-up">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Trending Keywords</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Most searched items this week</p>
      </div>

      <div className="space-y-4 mb-8">
        {keywords.map((keyword, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">{keyword.tag}</span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">{keyword.count} times</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: getBarWidth(keyword.count) }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Other Tags</h4>
        <div className="flex flex-wrap gap-2">
          {otherTags.map((tag, idx) => (
            <button
              key={idx}
              className="px-3 py-1.5 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}