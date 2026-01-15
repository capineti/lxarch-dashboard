import { useState } from 'react';
import './VendorAnalyticsScreen.css';

// Mock Data simulating n8n workflows
const weeklyStats = {
    totalMeetings: 12,
    activeVendors: 8,
    avgSentiment: 'Positive', // scale ranges
    reportsGenerated: 4
};

const vendorMeetings = [
    { id: 1, vendor: 'Acme Materials', date: '2025-10-24', sentiment: 'High', topics: ['Pricing', 'Logistics'], status: 'Follow-up' },
    { id: 2, vendor: 'BuildRight Inc', date: '2025-10-23', sentiment: 'Neutral', topics: ['Catalog Review'], status: 'Completed' },
    { id: 3, vendor: 'GlassXperts', date: '2025-10-22', sentiment: 'Very High', topics: ['Project A spec', 'Sustainability'], status: 'Proposal Rcvd' },
    { id: 4, vendor: 'SteelCo', date: '2025-10-20', sentiment: 'Low', topics: ['Delay discussion'], status: 'Escalated' },
    { id: 5, vendor: 'Lumina Lighting', date: '2025-10-18', sentiment: 'High', topics: ['New collection'], status: 'Follow-up' },
];

export const VendorAnalyticsScreen = () => {
    const [filter, setFilter] = useState('All');

    return (
        <div className="vendor-dashboard">
            <header className="vendor-header">
                <div>
                    <h2 className="screen-title">Vendor Analytics</h2>
                    <p className="screen-subtitle">Insights from Weekly Reports & Meeting Analysis</p>
                </div>
                <button className="btn-primary">Export Report</button>
            </header>

            {/* KPI Cards */}
            <div className="vendor-kpi-grid">
                <div className="kpi-card">
                    <span className="kpi-label">Weekly Meetings</span>
                    <span className="kpi-value">{weeklyStats.totalMeetings}</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-label">Active Vendors</span>
                    <span className="kpi-value">{weeklyStats.activeVendors}</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-label">Avg. Sentiment</span>
                    <span className={`kpi-badge ${weeklyStats.avgSentiment.toLowerCase()}`}>
                        {weeklyStats.avgSentiment}
                    </span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-label">Reports Generated</span>
                    <span className="kpi-value">{weeklyStats.reportsGenerated}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="vendor-content-split">
                {/* Vendors List / Meeting Analysis */}
                <section className="vendor-table-section">
                    <h3>Recent Vendor Meetings</h3>
                    <div className="table-responsive">
                        <table className="vendor-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Date</th>
                                    <th>Key Topics</th>
                                    <th>Sentiment</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendorMeetings.map(meeting => (
                                    <tr key={meeting.id}>
                                        <td className="fw-medium">{meeting.vendor}</td>
                                        <td className="text-muted">{meeting.date}</td>
                                        <td>
                                            <div className="topics-flex">
                                                {meeting.topics.map(topic => (
                                                    <span key={topic} className="topic-tag">{topic}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`sentiment-indicator ${meeting.sentiment.toLowerCase().replace(' ', '-')}`}>
                                                {meeting.sentiment}
                                            </span>
                                        </td>
                                        <td>{meeting.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Side Panel / Insights */}
                <aside className="vendor-insights-panel">
                    <h3>AI Insights</h3>
                    <div className="insight-card">
                        <h4>💡 Negotiation Opportunity</h4>
                        <p>GlassXperts showed very high sentiment regarding sustainability. Consider pushing for the eco-line discount.</p>
                    </div>
                    <div className="insight-card warning">
                        <h4>⚠️ Attention Needed</h4>
                        <p>SteelCo meeting discussed delays. Recommended action: schedule review call with production manager.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};
