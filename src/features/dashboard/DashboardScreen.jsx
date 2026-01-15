import './DashboardScreen.css';

// Mock Data
const stats = [
    { label: 'Total Visits', value: '124,592', change: '+12.5%', isPositive: true },
    { label: 'Active Users', value: '8,400', change: '+5.2%', isPositive: true },
    { label: 'Bounce Rate', value: '42.3%', change: '-2.1%', isPositive: true }, // Negative value in bounce rate is good
    { label: 'Avg. Session', value: '4m 32s', change: '-1.4%', isPositive: false },
];

const recentActivity = [
    { id: 1, user: 'Alice M.', action: 'Uploaded new blueprint', time: '2 mins ago' },
    { id: 2, user: 'Bob D.', action: 'Commented on Project X', time: '15 mins ago' },
    { id: 3, user: 'Charlie', action: 'Archived old assets', time: '1 hour ago' },
];

export const DashboardScreen = () => {
    return (
        <div className="dashboard-container">
            {/* Stats Grid */}
            <section className="u-grid-dashboard stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <h3 className="stat-label">{stat.label}</h3>
                        <div className="stat-value">{stat.value}</div>
                        <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                            {stat.change} <span className="stat-period">vs last month</span>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dashboard-split">
                {/* Main Chart Area (Placeholder) */}
                <section className="chart-section card">
                    <div className="card-header">
                        <h2>Analytics Overview</h2>
                    </div>
                    <div className="chart-placeholder">
                        {/* Visual placeholder for a chart */}
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '70%' }}></div>
                        <div className="bar" style={{ height: '55%' }}></div>
                        <div className="bar" style={{ height: '85%' }}></div>
                        <div className="bar" style={{ height: '60%' }}></div>
                        <div className="bar" style={{ height: '45%' }}></div>
                        <div className="bar" style={{ height: '75%' }}></div>
                        <div className="bar" style={{ height: '90%' }}></div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="activity-section card">
                    <div className="card-header">
                        <h2>Recent Activity</h2>
                    </div>
                    <ul className="activity-list">
                        {recentActivity.map(item => (
                            <li key={item.id} className="activity-item">
                                <div className="activity-content">
                                    <p className="activity-text">
                                        <strong>{item.user}</strong> {item.action}
                                    </p>
                                    <span className="activity-time">{item.time}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};
