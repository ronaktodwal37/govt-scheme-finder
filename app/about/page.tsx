export const metadata = {
    title: 'Sahaay: About Us',
    description: 'Bridging the gap between policy and people with intelligent AI-driven social schemes.'
}

export default function About() {
    return (
        <div className="section fade-in">
            <div className="container about-section" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="gradient-text">Bridging the Gap Between Policy and People</h1>
                <p>GovAssist AI leverages cutting-edge intelligence to ensure that every citizen in India can navigate the complex ecosystem of social schemes with dignity and ease.</p>

                <div className="glass-card" style={{ marginTop: '40px', textAlign: 'left' }}>
                    <h2>Our Mission</h2>
                    <p>To democratize access to government intelligence. We build localized, AI-driven solutions that remove the linguistic and bureaucratic barriers preventing 1.4 billion people from accessing their rightful benefits.</p>

                    <h2 style={{ marginTop: '20px' }}>Our Vision</h2>
                    <p>An India where social safety nets are invisible yet omnipresent. We envision a future where every citizen receives proactive, personalized guidance on schemes that can transform their lives, at the push of a button.</p>

                    <h2 style={{ marginTop: '20px' }}>The Values that Guide Us</h2>
                    <ul style={{ marginLeft: '20px', color: 'var(--text-muted)' }}>
                        <li><strong>Transparency:</strong> Every AI decision is explainable.</li>
                        <li><strong>Accessibility:</strong> Built for Bharat. Supporting regional dialects.</li>
                        <li><strong>Innovation:</strong> Continuous R&D in Large Language Models.</li>
                    </ul>
                </div>

                <h2 style={{ marginTop: '60px' }}>The Minds Behind the Mission</h2>
                <div className="team-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px'
                }}>
                    <div className="glass-card team-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <img src="/ananya.png" alt="Dr. Ananya Sharma" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '2px solid var(--primary)', display: 'inline-block' }} />
                        <h3>Dr. Ananya Sharma</h3>
                        <p className="small text-muted">CEO & Founder</p>
                    </div>
                    <div className="glass-card team-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <img src="/vikram.png" alt="Vikram Mehta" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '2px solid var(--primary)', display: 'inline-block' }} />
                        <h3>Vikram Mehta</h3>
                        <p className="small text-muted">CTO</p>
                    </div>
                    <div className="glass-card team-card" style={{ textAlign: 'center', padding: '20px' }}>
                        <img src="/priya.png" alt="Priya Iyer" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '2px solid var(--primary)', display: 'inline-block' }} />
                        <h3>Priya Iyer</h3>
                        <p className="small text-muted">Dir. Public Policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
