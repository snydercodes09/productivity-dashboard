import useLocalStorage from '../hooks/useLocalStorage';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

function generateHours() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = (5 + i) % 24;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? 'AM' : 'PM';
    hours.push({ hour, label: `${displayHour} ${ampm}` });
  }
  return hours;
}

const timeSlots = generateHours();

export default function PlannerModal({ onClose }) {
  const [plannerData, setPlannerData] = useLocalStorage('dashboard-planner', {});

  const handleInput = (hour, value) => {
    // 🛡️ Sentinel: Enforce JS-level length limit to prevent storage exhaustion
    setPlannerData({ ...plannerData, [hour]: value.substring(0, 200) });
  };

  const clearAll = () => {
    setPlannerData({});
  };

  return (
    <section className="modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="modal-content bg-[#171d2b] rounded-3xl w-full max-w-2xl min-h-[580px] flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-10"
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">Plan your Day</h2>
          <p className="text-gray-400 text-sm mt-1">Time-block your schedule to be more productive.</p>
        </div>

        {/* Schedule */}
        <div className="p-8 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">Schedule</h3>
            <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer font-medium">
              Clear All
            </button>
          </div>

          <div className="bg-[#131924] rounded-2xl p-3 border border-white/5">
            <div className="space-y-1 custom-scrollbar overflow-y-auto max-h-[380px] pr-2">
              {timeSlots.map(({ hour, label }) => (
                <div
                  key={hour}
                  className="flex items-stretch border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors rounded-lg"
                >
                  <div className="w-20 p-3 text-right text-xs font-semibold text-gray-400 border-r border-white/5 group-hover:text-purple-400 transition-colors flex-shrink-0">
                    {label}
                  </div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="w-full h-full bg-transparent border-none px-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:bg-white/5 rounded-r-lg"
                      placeholder="Plan this hour..."
                      maxLength={200}
                      value={plannerData[hour] || ''}
                      onChange={(e) => handleInput(hour, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
