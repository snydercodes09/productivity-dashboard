import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);

export default function GoalsModal({ onClose }) {
  const [goals, setGoals] = useLocalStorage('dashboard-goals', []);
  const [goalText, setGoalText] = useState('');

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const circumference = 2 * Math.PI * 65;
  const strokeOffset = circumference - (percentage / 100) * circumference;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    // 🛡️ Sentinel: Enforce length limit at state level to prevent local storage DoS
    setGoals([...goals, { id: Date.now(), text: goalText.trim().slice(0, 100), completed: false }]);
    setGoalText('');
  };

  const toggleGoal = (id) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <section className="modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="modal-content bg-[#171d2b] rounded-3xl w-full max-w-xl min-h-[520px] flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-10"
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Daily Goals</h2>
          <p className="text-gray-400 text-xs mt-1">What is your main focus for today?</p>
        </div>

        {/* Content */}
        <div className="p-8 pt-2 flex flex-col items-center">
          {/* Progress Ring */}
          <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-white/10"
              />
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white tracking-tight">{percentage}%</h3>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-6">
            {completedCount} of {totalCount} goals done
          </p>

          {/* Add Goal Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
              <input
                type="text"
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="Add a new goal..."
                maxLength={100}
                required
                className="flex-grow bg-[#131924] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium text-xs transition-colors cursor-pointer"
              >
                Add
              </button>
            </form>

            {/* Goals List */}
            <div className="space-y-2.5 custom-scrollbar overflow-y-auto max-h-[160px] pr-2">
              {goals.length === 0 ? (
                <p className="text-center text-gray-500 text-xs py-4">No goals set for today.</p>
              ) : (
                goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      goal.completed
                        ? 'bg-white/5 border-white/5 opacity-60'
                        : 'bg-[#202738] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleGoal(goal.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                          goal.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-gray-500 text-transparent hover:border-emerald-400'
                        }`}
                      >
                        <CheckIcon />
                      </button>
                      <span className={`text-xs font-medium text-white ${goal.completed ? 'line-through !text-gray-400' : ''}`}>
                        {goal.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
