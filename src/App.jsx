import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AgentGridScreen } from './features/vendors/AgentGridScreen';
import { AnalysisScreen } from './features/analysis/AnalysisScreen';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleAgentSelect = (agent) => {
    console.log("Selected agent:", agent);
    setSelectedAgent(agent);
    setCurrentView('analysis_detail');
  };

  const handleBackToGrid = () => {
    setSelectedAgent(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AgentGridScreen onAgentSelect={handleAgentSelect} />;
      case 'analysis_detail':
        return <AnalysisScreen agent={selectedAgent} onBack={handleBackToGrid} />;
      case 'settings':
        return <div className="p-10">Configuración (WIP)</div>;
      default:
        return <AgentGridScreen onAgentSelect={handleAgentSelect} />;
    }
  };

  return (
    <MainLayout currentView={currentView} onNavigate={(view) => {
      // Reset detailed view if navigating via sidebar
      if (view !== 'analysis_detail') setSelectedAgent(null);
      setCurrentView(view);
    }}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
