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

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default function TodoModal({ onClose }) {
  const [todos, setTodos] = useLocalStorage('dashboard-todos', []);
  const [filter, setFilter] = useState('all');
  const [taskText, setTaskText] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    setTodos([{ id: Date.now(), text: taskText.trim(), details: taskDetails.trim(), completed: false }, ...todos]);
    setTaskText('');
    setTaskDetails('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const newText = prompt('Update task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
      const newDetails = prompt('Update details (optional):', todo.details || '');
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, text: newText.trim().substring(0, 100), details: newDetails !== null ? newDetails.trim().substring(0, 500) : t.details } : t
        )
      );
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const filtered =
    filter === 'active' ? todos.filter((t) => !t.completed) :
    filter === 'completed' ? todos.filter((t) => t.completed) :
    todos;

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <section className="modal-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="modal-content bg-[#171d2b] rounded-3xl w-full max-w-4xl min-h-[580px] flex flex-col relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-10"
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">Your Personalised Task List</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your daily todos effectively.</p>
        </div>

        {/* Body */}
        <div className="flex-grow flex flex-col md:flex-row gap-8 p-8 pt-4">
          {/* Left Panel: Form */}
          <div className="w-full md:w-1/3">
            <div className="bg-[#202738] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold mb-4 text-white">Add New Task</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="What needs to be done?"
                  maxLength={100}
                  required
                  className="w-full bg-[#151b27] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <textarea
                  value={taskDetails}
                  onChange={(e) => setTaskDetails(e.target.value)}
                  placeholder="Enter Details (optional)"
                  maxLength={500}
                  rows="3"
                  className="w-full bg-[#151b27] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer text-sm"
                >
                  <ArrowRightIcon /> Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: List */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      filter === f.key
                        ? 'bg-blue-500/20 text-cyan-400 border-cyan-500/40'
                        : 'text-gray-400 border-white/10 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <button onClick={clearCompleted} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                Clear Completed
              </button>
            </div>

            <div className="flex-grow space-y-3 custom-scrollbar overflow-y-auto max-h-[420px] pr-2">
              {filtered.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-sm py-16">
                  No tasks found.
                </div>
              ) : (
                filtered.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group flex items-start gap-4 p-4 rounded-xl transition-all border ${
                      todo.completed ? 'bg-white/5 border-white/5 opacity-60' : 'bg-[#202738] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                        todo.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-500 text-transparent hover:border-blue-400'
                      }`}
                    >
                      <CheckIcon />
                    </button>
                    <div className="flex-grow">
                      <h4 className={`text-sm font-medium text-white ${todo.completed ? 'line-through !text-gray-400' : ''}`}>
                        {todo.text}
                      </h4>
                      {todo.details && <p className="text-xs text-gray-400 mt-1">{todo.details}</p>}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => updateTodo(todo.id)} className="text-gray-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-500/10 cursor-pointer">
                        <EditIcon />
                      </button>
                      <button onClick={() => deleteTodo(todo.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer">
                        <DeleteIcon />
                      </button>
                    </div>
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
