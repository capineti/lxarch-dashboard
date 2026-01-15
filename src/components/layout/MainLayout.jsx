import { useState, useEffect, useRef } from 'react';
import './MainLayout.css';

export const MainLayout = ({ children, currentView, onNavigate }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      setIsScrolled(mainElement.scrollTop > 10);
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="layout-root" data-theme={theme}>
      <header className={`layout-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-logo">
            <img src="/src/assets/lxarch-logo.svg" alt="LxArch Logo" className="logo-img" />
          </div>
          <div className="header-controls">
            <div className="user-profile">
              <div className="user-avatar-img"></div>
              <div className="user-info">
                <span className="user-name">Caterina</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </header>

      <main
        ref={mainRef}
        className={`layout-main ${currentView === 'dashboard' ? 'dashboard-bg' : ''}`}
      >
        <div className="main-content full-height">
          {children}
        </div>
      </main>
    </div>
  );
};
