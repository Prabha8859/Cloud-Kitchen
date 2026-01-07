import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Rehan Doe',
    time: '4 day ago',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Himesh Doe',
    time: '1 day ago',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Johen Doe',
    time: '1 day ago',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop'
  }
];

const ReviewCard = ({ review }) => (
  <div className="snap-start w-full md:w-[calc(33.333%-1rem)] flex-shrink-0 bg-gray-50 dark:bg-slate-700/40 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-start gap-4">
      <img 
        src={review.image} 
        alt={review.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{review.time}</p>
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg shadow-inner">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{review.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2 italic">
          "{review.review}"
        </p>
      </div>
    </div>
  </div>
);

export default function CustomerReview() {
  const scrollContainer = useRef(null);
  
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: container.clientWidth / 3, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      if (direction === 1 && scrollLeft + clientWidth >= scrollWidth - 10) {
         scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
         scrollContainer.current.scrollBy({ left: direction * (scrollContainer.current.clientWidth / 3), behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 animate-fade-in-up hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">What Our Customers Say</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => handleScroll(-1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button onClick={() => handleScroll(1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div ref={scrollContainer} className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory no-scrollbar">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}