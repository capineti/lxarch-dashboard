import './MainLayout.css';

export const MainLayout = ({ children }) => {
  return (
    <div className="layout-root">
      <aside className="layout-sidebar">
        <div className="sidebar-header">
          <div className="logo-icon"></div>
          <span className="logo-text">LxArch</span>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">Dashboard</a>
          <a href="#" className="nav-item">Analytics</a>
          <a href="#" className="nav-item">Reports</a>
          <a href="#" className="nav-item">Settings</a>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">SC</div>
            <div className="user-info">
              <span className="user-name">Sergio C.</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="layout-main">
        <header className="main-header">
          <h1 className="page-title">Overview</h1>
          <div className="header-actions">
           <button className="btn-icon">🔔</button>
          </div>
        </header> 
        <div className="main-content">
          {children}
        </div>
      </main>
    </div>
  );
};
