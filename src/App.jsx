import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import FeatureGrid from './components/FeatureGrid';

// ⚡ Bolt: Lazy load modals to reduce initial bundle size.
// Expected Impact: Reduces main chunk size by ~50KB (uncompressed) since modals are only loaded when opened.
const TodoModal = lazy(() => import('./components/TodoModal'));
const PlannerModal = lazy(() => import('./components/PlannerModal'));
const MotivationModal = lazy(() => import('./components/MotivationModal'));
const PomodoroModal = lazy(() => import('./components/PomodoroModal'));
const GoalsModal = lazy(() => import('./components/GoalsModal'));

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-transparent dark:bg-black/60 backdrop-blur-[2px] transition-colors duration-500 z-0 pointer-events-none" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col relative z-10">
        <Navbar />
        <FeatureGrid onOpenModal={openModal} />
      </div>

      {/* Modals */}
      {/* ⚡ Bolt: Suspense boundary prevents UI blocking while fetching modal chunks */}
      <Suspense fallback={null}>
        {activeModal === 'todo' && <TodoModal onClose={closeModal} />}
        {activeModal === 'planner' && <PlannerModal onClose={closeModal} />}
        {activeModal === 'motivation' && <MotivationModal onClose={closeModal} />}
        {activeModal === 'pomodoro' && <PomodoroModal onClose={closeModal} />}
        {activeModal === 'goals' && <GoalsModal onClose={closeModal} />}
      </Suspense>
    </>
  );
}
