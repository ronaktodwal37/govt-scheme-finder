"use client";

export default function HelpCenters() {
    return (
        <div className="section fade-in">
            <div className="container dual-col">
                <div>
                    <h1 className="gradient-text">Nearby Help Centers (CSC)</h1>
                    <p>Find your nearest Common Service Center to get offline assistance with scheme enrollment and document verification.</p>
                    <div className="input-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <form id="map-search-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" id="map-search-input"
                                placeholder="Enter PIN code or location (e.g. 'CSC center Pune')..." required />
                            <button type="submit" className="btn-primary w-100" style={{ marginTop: '10px' }}>Search Map</button>
                        </form>
                    </div>

                    <div className="cards-grid">
                        <div className="glass-card center-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                            <div className="center-info">
                                <h3>Rajeev Gandhi Seva Kendra</h3>
                                <p className="small text-muted"><i className="fa-solid fa-map-pin"></i> Block A, Market Street, 800001</p>
                            </div>
                            <div className="distance-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)', padding: '5px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>0.8 km <i className="fa-solid fa-location-arrow"></i></div>
                        </div>
                        <div className="glass-card center-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                            <div className="center-info">
                                <h3>Bhavani CSC Digital Center</h3>
                                <p className="small text-muted"><i className="fa-solid fa-map-pin"></i> Near Post Office, Main Road, 800002</p>
                            </div>
                            <div className="distance-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)', padding: '5px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>2.4 km <i className="fa-solid fa-location-arrow"></i></div>
                        </div>
                        <div className="glass-card center-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                            <div className="center-info">
                                <h3>Panchayat e-Mitra Hub</h3>
                                <p className="small text-muted"><i className="fa-solid fa-map-pin"></i> Block C, State Highway 90, 800004</p>
                            </div>
                            <div className="distance-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)', padding: '5px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>4.1 km <i className="fa-solid fa-location-arrow"></i></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="map-placeholder" style={{ width: '100%', height: '350px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)', border: 'none', marginBottom: '30px', padding: 0, overflow: 'hidden' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14399.722421319088!2d85.1278142!3d25.6238515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed584a2fa3aa95%3A0xc6ad10902a7b8eaf!2sCommon%20Service%20Center!5e0!3m2!1sen!2sin!4v1680101234567!5m2!1sen!2sin"
                            width="100%" height="100%"
                            style={{ border: 0, borderRadius: '12px', filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="glass-card">
                        <h3>Document Checklist before visiting:</h3>
                        <ul style={{ marginTop: '10px', marginLeft: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
                            <li>Original Aadhaar Card</li>
                            <li>Bank Passbook / Cancelled Cheque</li>
                            <li>Recent Income Certificate</li>
                            <li>Passport Sized Photographs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
