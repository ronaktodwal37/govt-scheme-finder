"use client";
import { useState } from "react";

export default function Forum() {
    const [showNewPost, setShowNewPost] = useState(false);

    return (
        <div className="section fade-in">
            <div className="container">
                <div className="forum-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h1 className="gradient-text">Community Forum</h1>
                        <p>Ask questions and share your success stories.</p>
                    </div>
                    <button className="btn-primary" onClick={() => setShowNewPost(true)}>
                        <i className="fa-solid fa-plus"></i> New Discussion
                    </button>
                </div>

                {/* New Post Form */}
                {showNewPost && (
                    <div id="new-post-form" className="glass-card" style={{ marginBottom: '20px' }}>
                        <form id="forum-form" onSubmit={(e) => { e.preventDefault(); setShowNewPost(false); }}>
                            <div className="input-group">
                                <label>Topic Title</label>
                                <input type="text" id="forum-title" required placeholder="Question or topic" />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea id="forum-desc" required
                                    style={{ width: '100%', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '8px' }}
                                    rows={3} placeholder="Describe your question..."></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" className="btn-primary">Post</button>
                                <button type="button" className="btn-secondary" onClick={() => setShowNewPost(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                <div id="forum-posts-container">
                    <div className="glass-card post-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div className="post-votes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '8px' }}>
                            <i className="fa-solid fa-chevron-up" style={{ color: 'var(--primary)', cursor: 'pointer' }}></i>
                            <strong style={{ margin: '5px 0' }}>124</strong>
                            <i className="fa-solid fa-chevron-down" style={{ color: 'var(--text-muted)', cursor: 'pointer' }}></i>
                        </div>
                        <div className="post-content" style={{ flexGrow: 1 }}>
                            <h3>How do I check my PM Kisan status offline?</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>I have applied last month but I don't have good internet access. Where can I go to verify my name in the beneficiary list?</p>
                            <div className="post-meta" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>
                                <span className="tag" style={{ background: 'rgba(236, 72, 153, 0.2)', color: 'var(--secondary)', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Agriculture</span> &bull; Posted by User992 &bull; 14 Comments
                            </div>
                        </div>
                    </div>

                    <div className="glass-card post-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div className="post-votes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '8px' }}>
                            <i className="fa-solid fa-chevron-up" style={{ color: 'var(--primary)', cursor: 'pointer' }}></i>
                            <strong style={{ margin: '5px 0' }}>89</strong>
                            <i className="fa-solid fa-chevron-down" style={{ color: 'var(--text-muted)', cursor: 'pointer' }}></i>
                        </div>
                        <div className="post-content" style={{ flexGrow: 1 }}>
                            <h3>Documents required for Sukanya Samriddhi?</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Can someone provide an updated checklist of what the bank requires to open the SSY account?</p>
                            <div className="post-meta" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>
                                <span className="tag" style={{ background: 'rgba(236, 72, 153, 0.2)', color: 'var(--secondary)', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Education</span> &bull; Posted by Rani_Devi &bull; 6 Comments
                            </div>
                        </div>
                    </div>

                    <div className="glass-card post-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div className="post-votes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '8px' }}>
                            <i className="fa-solid fa-chevron-up" style={{ color: 'var(--primary)', cursor: 'pointer' }}></i>
                            <strong style={{ margin: '5px 0' }}>210</strong>
                            <i className="fa-solid fa-chevron-down" style={{ color: 'var(--text-muted)', cursor: 'pointer' }}></i>
                        </div>
                        <div className="post-content" style={{ flexGrow: 1 }}>
                            <h3><i className="fa-solid fa-check-circle" style={{ color: 'var(--success)' }}></i> Solved: PM-JAY Registration Issue</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>If you are facing issues with Aadhaar mismatch, you need to visit a CSC center. Here's a step-by-step guide on what I did to get it fixed.</p>
                            <div className="post-meta" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>
                                <span className="tag" style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--success)', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Health</span> &bull; Posted by InfoGuru &bull; 42 Comments
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
