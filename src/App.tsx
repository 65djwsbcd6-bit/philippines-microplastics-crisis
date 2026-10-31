import { useState, useEffect } from 'react';
import { Navigation, ViewMode } from './components/Navigation';
import { GatewayView } from './components/GatewayView';
import { CrisisView } from './components/CrisisView';
import { SolutionView } from './components/SolutionView';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('gateway');

  const handleSwitchView = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView === 'gateway') {
      document.body.className = 'bg-[#fbf9f6] text-slate-800 overflow-x-hidden';
    } else if (currentView === 'crisis') {
      document.body.className = 'bg-ocean-900 text-slate-100 overflow-x-hidden';
    } else if (currentView === 'solution') {
      document.body.className = 'bg-slate-50 text-slate-800 overflow-x-hidden';
    }
  }, [currentView]);

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} onSwitchView={handleSwitchView} />

      {currentView === 'gateway' && <GatewayView onSwitchView={handleSwitchView} />}
      {currentView === 'crisis' && (
        <CrisisView onSwitchView={() => handleSwitchView('solution')} />
      )}
      {currentView === 'solution' && <SolutionView onSwitchView={handleSwitchView} />}
    </div>
  );
}

export default App;
