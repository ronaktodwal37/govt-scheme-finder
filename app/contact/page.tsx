"use client";
import { useState } from 'react';

export default function Contact() {
    return (
        <div className="section fade-in">
            <div className="container dual-col" style={{ alignItems: 'flex-start' }}>
                <div className="contact-info">
                    <h1 className="gradient-text" style={{ fontSize: '40px', marginBottom: '20px' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '18px' }}>
                        Have questions about a scheme or need help navigating the platform? Our regional support team is here to assist.
                    </p>

                    <h2>Contact Information</h2>
                    <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-location-dot"></i> <strong>Headquarters:</strong> Tech Park, Cyber City, India
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-envelope"></i> <strong>Email:</strong> support@govassist.in
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-phone"></i> <strong>Toll-Free Helpline:</strong> 1800-111-2222
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>
                        <i className="fa-brands fa-whatsapp"></i> <strong>WhatsApp Support:</strong> +91-9876543210
                    </p>
                </div>

                <div className="glass-card">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
                        <div className="input-group">
                            <label>Name</label>
                            <input type="text" required placeholder="Your full name" />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" required placeholder="Your email address" />
                        </div>
                        <div className="input-group">
                            <label>Message</label>
                            <textarea
                                style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '8px' }}
                                rows={4} required placeholder="How can we assist you?"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
