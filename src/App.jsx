import { MainLayout } from './components/layout/MainLayout';
import { DashboardScreen } from './features/dashboard/DashboardScreen';

function App() {
  return (
    <MainLayout>
      <DashboardScreen />
    </MainLayout>
  );
}

export default App;
