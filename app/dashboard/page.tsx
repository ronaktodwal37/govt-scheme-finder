"use client";

export default function Dashboard() {
    return (
        <div className="section fade-in">
            <div className="container">
                <div className="dashboard-header glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    <div className="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>R</div>
                    <div>
                        <h2 id="dashboard-name">Welcome back!</h2>
                        <p className="text-muted"><i className="fa-solid fa-id-card"></i> Aadhaar Linked &bull; Profile 85% Complete</p>
                    </div>
                    <button className="btn-primary" style={{ marginLeft: 'auto' }}>Edit Profile</button>
                </div>

                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <div className="glass-card stat-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <i className="fa-solid fa-bookmark" style={{ fontSize: '24px', color: 'var(--text-muted)' }}></i>
                        <h2 style={{ fontSize: '36px', margin: '10px 0', color: 'var(--primary)' }}>4</h2>
                        <p>Saved Schemes</p>
                    </div>
                    <div className="glass-card stat-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <i className="fa-solid fa-file-signature" style={{ fontSize: '24px', color: 'var(--text-muted)' }}></i>
                        <h2 style={{ fontSize: '36px', margin: '10px 0', color: 'var(--primary)' }}>1</h2>
                        <p>Active Applications</p>
                    </div>
                    <div className="glass-card stat-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <i className="fa-solid fa-certificate" style={{ fontSize: '24px', color: 'var(--text-muted)' }}></i>
                        <h2 style={{ fontSize: '36px', margin: '10px 0', color: 'var(--primary)' }}>3</h2>
                        <p>Pending Documents</p>
                    </div>
                </div>

                <h3 style={{ marginBottom: '20px' }}>Your Saved Schemes</h3>
                <div id="dashboard-schemes-grid" className="cards-grid-large">
                    <div className="scheme-card">
                        <div className="scheme-header">
                            <div className="scheme-title">PM Kisan Samman Nidhi Yojana</div>
                            <div className="scheme-tag"><i className="fa-solid fa-clock"></i> Draft</div>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '15px', fontSize: '14px' }}>Next Step: Upload Aadhaar ID</p>
                        <button className="btn-primary w-100">Resume Application</button>
                    </div>

                    <div className="scheme-card">
                        <div className="scheme-header">
                            <div className="scheme-title">Ayushman Bharat PM-JAY</div>
                            <div className="scheme-tag" style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--success)' }}><i className="fa-solid fa-check"></i> Approved</div>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '15px', fontSize: '14px' }}>Health card actively generating.</p>
                        <button className="btn-secondary w-100">View Status</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
