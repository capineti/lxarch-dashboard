import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AgentGridScreen } from './features/vendors/AgentGridScreen';
import { VendorAnalyticsScreen } from './features/vendors/VendorAnalyticsScreen'; // New Import
import { AnalysisScreen } from './features/analysis/AnalysisScreen';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null); // Track selected call

  // Step 1: Click Agent -> Go to Vendor Dashboard
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setCurrentView('vendor_dashboard');
  };

  // Step 2: Click Call -> Go to Analysis Detail
  const handleCallSelect = (call) => {
    console.log("Selected call:", call);
    setSelectedCall(call);
    setCurrentView('analysis_detail');
  };

  // Back from Analysis -> Vendor Dashboard
  const handleBackToVendor = () => {
    setSelectedCall(null);
    setCurrentView('vendor_dashboard');
  };

  // Back from Vendor Dashboard -> Main Agent Grid
  const handleBackToGrid = () => {
    setSelectedAgent(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AgentGridScreen onAgentSelect={handleAgentSelect} />;
      case 'vendor_dashboard':
        return (
          <VendorAnalyticsScreen
            agent={selectedAgent}
            onBack={handleBackToGrid}
            onSelectCall={handleCallSelect}
          />
        );
      case 'analysis_detail':
        return (
          <AnalysisScreen
            agent={selectedAgent}
            call={selectedCall}
            onBack={handleBackToVendor}
          />
        );
      case 'settings':
        return <div className="p-10">Configuración (WIP)</div>;
      default:
        return <AgentGridScreen onAgentSelect={handleAgentSelect} />;
    }
  };

  return (
    <MainLayout currentView={currentView} onNavigate={(view) => {
      // Reset detailed view if navigating via sidebar
      if (view === 'dashboard') {
        setSelectedAgent(null);
        setSelectedCall(null);
      }
      setCurrentView(view);
    }}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
