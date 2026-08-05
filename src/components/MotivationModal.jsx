import { useState, useEffect, useCallback } from 'react';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-6">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

export default function MotivationModal({ onClose }) {
  const [quote, setQuote] = useState({ text: '"Loading inspiration..."', author: '- -' });

  const fetchQuote = useCallback(() => {
    setQuote({ text: '"Loading inspiration..."', author: '- -' });

    fetch('https://dummyjson.com/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote({ text: `"${data.quote}"`, author: `- ${data.author}` });
      })
      .catch(() => {
        setQuote({
          text: '"The secret of getting ahead is getting started."',
          author: '- Mark Twain',
        });
      });
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <section className="modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
      <div className="modal-content bg-[#131924] rounded-3xl w-full max-w-2xl flex flex-col items-center justify-center relative overflow-hidden border border-white/10 shadow-2xl p-12 text-center">
        {/* Background glow gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-20"
        >
          <CloseIcon />
        </button>

        <div className="relative z-10 flex flex-col items-center max-w-xl">
          <QuoteIcon />
          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-6 text-white tracking-tight">
            {quote.text}
          </h1>
          <h2 className="text-sm text-blue-400 font-medium tracking-wide">
            {quote.author}
          </h2>
          <button
            onClick={fetchQuote}
            className="mt-8 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/10 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshIcon /> New Quote
          </button>
        </div>
      </div>
    </section>
  );
}
