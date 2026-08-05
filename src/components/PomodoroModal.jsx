import usePomodoro from '../hooks/usePomodoro';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
  </svg>
);

const modes = [
  { key: 'focus', label: 'Focus (25m)', minutes: 25 },
  { key: 'shortBreak', label: 'Short Break (5m)', minutes: 5 },
  { key: 'longBreak', label: 'Long Break (15m)', minutes: 15 },
];

const modeLabels = {
  focus: 'WORK SESSION',
  shortBreak: 'SHORT BREAK',
  longBreak: 'LONG BREAK',
};

export default function PomodoroModal({ onClose }) {
  const { displayTime, progress, running, mode, toggle, reset, changeMode } = usePomodoro();

  const circumference = 2 * Math.PI * 110;
  const strokeOffset = circumference - progress * circumference;

  return (
    <section className="modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
      <div className="modal-content bg-[#171d2b] rounded-3xl w-full max-w-xl min-h-[520px] flex flex-col relative overflow-hidden border border-white/10 shadow-2xl items-center py-10 px-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-10"
        >
          <CloseIcon />
        </button>

        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Study with me!</h2>
        <h4 className="text-blue-400 font-semibold mb-8 tracking-widest text-xs">
          {modeLabels[mode]}
        </h4>

        {/* Timer Ring */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-white/10"
            />
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-blue-500 transition-all duration-1000 ease-linear"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </svg>
          <h1 className="text-6xl font-bold text-white tracking-tighter z-10">{displayTime}</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 z-10 mb-8">
          <button
            onClick={toggle}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all shadow-lg shadow-blue-600/30 transform hover:scale-105 cursor-pointer"
          >
            {running ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={reset}
            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 cursor-pointer"
          >
            <ResetIcon />
          </button>
        </div>

        {/* Mode Buttons */}
        <div className="flex gap-3">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => changeMode(m.key)}
              className={`px-4 py-2 rounded-xl font-medium text-xs border transition-colors cursor-pointer ${
                mode === m.key
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 border-transparent'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
