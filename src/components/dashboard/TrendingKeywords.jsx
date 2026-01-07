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
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Trending Keyword</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>

      <div className="space-y-4 mb-8">
        {keywords.map((keyword, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">{keyword.tag}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{keyword.count} times</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: getBarWidth(keyword.count) }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Others Tag</h4>
        <div className="flex flex-wrap gap-2">
          {otherTags.map((tag, idx) => (
            <button
              key={idx}
              className="px-4 py-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}