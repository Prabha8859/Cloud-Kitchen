import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Edit } from 'lucide-react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';

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
  <div className="snap-start w-full md:w-[calc(33.333%-1rem)] flex-shrink-0 bg-gray-50 dark:bg-slate-700/40 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
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
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for forward, -1 for backward
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      // If we are at the end, switch to backward
      if (scrollLeft >= maxScroll - 10) {
        setScrollDirection(-1);
      } 
      // If we are at the start, switch to forward
      else if (scrollLeft <= 10) {
        setScrollDirection(1);
      }

      // Scroll based on current direction
      if (scrollDirection === 1) {
        container.scrollBy({ left: container.clientWidth / 3, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -(container.clientWidth / 3), behavior: 'smooth' });
      }
    }, 3000); // Faster interval for better visibility of movement

    return () => clearInterval(interval);
  }, [scrollDirection]);

  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: direction * (scrollContainer.current.clientWidth / 3), behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 animate-fade-in-up hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">What Our Customers Say</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Edit} onClick={() => setIsModalOpen(true)}>
              Write a Review
            </Button>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Review">
        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-4">
            <Input type="text" placeholder="Your Name" required />
            <Textarea placeholder="Write your review here..." required />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    <Star className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit Review
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}