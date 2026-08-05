const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const cards = [
  {
    id: 'todo',
    title: 'To Do List',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2000&auto=format&fit=crop',
    span: '',
  },
  {
    id: 'planner',
    title: 'Daily Planner',
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2000&auto=format&fit=crop',
    span: '',
  },
  {
    id: 'motivation',
    title: 'Motivation',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
    span: '',
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro Timer',
    image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=2000&auto=format&fit=crop',
    span: 'lg:col-span-2',
    extraImgClass: 'scale-[1.2] group-hover:scale-[1.3]',
  },
  {
    id: 'goals',
    title: 'Daily Goals',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop',
    span: '',
  },
];

export default function FeatureGrid({ onOpenModal }) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow card-animate"
      style={{ animationDelay: '0.2s' }}
    >
      {cards.map((card) => (
        <button
          key={card.id}
          className={`feature-card block w-full text-left relative overflow-hidden rounded-3xl glass-card cursor-pointer group aspect-[4/3] md:aspect-auto focus-visible:ring-4 focus-visible:ring-white/50 focus:outline-none ${card.span || ''}`}
          onClick={() => onOpenModal(card.id)}
        >
          <img
            src={card.image}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 ${card.extraImgClass || 'group-hover:scale-110'}`}
            alt={card.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 dark:from-gray-900/90 dark:via-gray-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-md tracking-tight">
                {card.title}
              </h2>
              <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </button>
      ))}
    </section>
  );
}
