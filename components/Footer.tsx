import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: '#111111', padding: '60px 0 20px 0', color: '#e0e0e0' }}>
            <div className="footer-grid container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>

                {/* Column 1: Brand & Description */}
                <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-landmark" style={{ color: 'var(--primary)' }}></i> GovAssist
                    </h3>
                    <p style={{ color: '#9ca3af', lineHeight: '1.6', fontSize: '14px', margin: '10px 0' }}>
                        Empowering citizens by simplifying access to government schemes, subsidies, and essential public services through intelligent technology.
                    </p>
                    <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                        <Link href="#" style={{ color: '#9ca3af', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-brands fa-facebook-f"></i></Link>
                        <Link href="#" style={{ color: '#9ca3af', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-brands fa-instagram"></i></Link>
                        <Link href="#" style={{ color: '#9ca3af', fontSize: '1.2rem', transition: '0.3s' }}><i className="fa-regular fa-envelope"></i></Link>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-col">
                    <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>Quick Links</h3>
                    <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><Link href="/#all-schemes" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Our Schemes</Link></li>
                        <li><Link href="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link></li>
                        <li><Link href="/help-centers" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>CSC Locator</Link></li>
                        <li><Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>About Us</Link></li>
                        <li><Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: Legal */}
                <div className="footer-col">
                    <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>Legal</h3>
                    <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>FAQ</Link></li>
                        <li><Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</Link></li>
                        <li><Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</Link></li>
                        <li><Link href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contact Us */}
                <div className="footer-col">
                    <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>Contact Us</h3>
                    <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                            <i className="fa-solid fa-location-dot" style={{ marginTop: '4px' }}></i>
                            <span>New Delhi, India</span>
                        </li>
                        <li style={{ color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginLeft: '22px' }}>Govt Support Team</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                            <i className="fa-solid fa-phone"></i>
                            <span>+91 9876543210</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                            <i className="fa-brands fa-whatsapp"></i>
                            <span>+91 1800-111-222</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                            <i className="fa-regular fa-envelope"></i>
                            <span>support@govassist.in</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom container" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'center', color: '#9ca3af', fontSize: '13px' }}>
                &copy; 2026 GovAssist Platform. All rights reserved.
            </div>

            {/* Floating Action Buttons from Image Reference */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
                <a href="#" style={{ width: '45px', height: '45px', background: '#facc15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '1.2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}>
                    <i className="fa-solid fa-phone"></i>
                </a>
                <a href="#" style={{ width: '45px', height: '45px', background: '#facc15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '1.4rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}>
                    <i className="fa-brands fa-whatsapp"></i>
                </a>
            </div>
        </footer>
    );
}
