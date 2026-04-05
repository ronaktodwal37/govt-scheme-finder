"use client";
import { useState, useEffect, useDeferredValue } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('matched');
  const [allSchemes, setAllSchemes] = useState<any[]>([]);

  // Advanced Multi-Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);

  // Profile Form State
  const [profileName, setProfileName] = useState('');
  const [profileState, setProfileState] = useState('');
  const [profileIncome, setProfileIncome] = useState('');
  const [profileCategories, setProfileCategories] = useState<string[]>([]);
  const [matchedSchemes, setMatchedSchemes] = useState<any[]>([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => setAllSchemes(data))
      .catch(err => console.error(err));
  }, []);

  const filteredSchemes = allSchemes.filter(s => {
    const q = deferredSearch.toLowerCase();

    const matchesSearch = q === '' ||
      (s.name?.toLowerCase().includes(q) || false) ||
      (s.description?.toLowerCase().includes(q) || false);

    const matchesCategory = selectedCategory === '' || s.category?.includes(selectedCategory);
    const matchesState = selectedState === '' || s.state === selectedState || s.state === 'All';

    return matchesSearch && matchesCategory && matchesState;
  });

  const handleSaveScheme = (id: string) => {
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeId: id })
    }).then(() => alert(`Successfully saved scheme: ${id} to your dashboard!`));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileCategories.length === 0) return alert("Please select at least one category.");

    setIsSubmitting(true);

    if (typeof window !== 'undefined') localStorage.setItem('gsf_userName', profileName);

    const profileData = { name: profileName, state: profileState, income: parseInt(profileIncome || '0'), category: profileCategories };

    try {
      const matchRes = await fetch('/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profileData) });
      setMatchedSchemes(await matchRes.json());

      const recRes = await fetch(`/api/recommend?profile=${encodeURIComponent(JSON.stringify(profileData))}`);
      setRecommendedSchemes(await recRes.json());

      setHasSubmitted(true);
      setActiveTab('matched');
      setTimeout(() => document.getElementById('matched-grid')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      alert("Error generating matches.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryToggle = (cat: string) => {
    setProfileCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const renderSchemeCard = (scheme: any) => (
    <div key={scheme.id} className="scheme-card glass-card">
      <div className="scheme-header">
        <div className="scheme-title">{scheme.name}</div>
        <div className="scheme-tag">{scheme.state}</div>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 600 }}>
        {scheme.category.join(', ')}
      </div>
      <div className="scheme-desc text-muted">
        {scheme.description ? scheme.description.substring(0, 100) : scheme.name}...
      </div>
      <div className="scheme-meta">
        <span><i className="fa-solid fa-coins"></i> Income Limit: {scheme.income_limit ? '₹' + scheme.income_limit : 'None'}</span>
        <button className="btn-primary" onClick={() => handleSaveScheme(scheme.id)}>Save <i className="fa-solid fa-bookmark"></i></button>
        {scheme.link && <a href={scheme.link} target="_blank" rel="noreferrer" className="btn-secondary">Apply</a>}
      </div>
    </div>
  );

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <div id="app" className="page-transition">
      {/* Hero Section */}
      <header id="home" className="hero section">
        <div className="hero-content blur-glass">
          <h1>Discover the Right <br /><span className="gradient-text">Government Schemes</span> For You</h1>
          <p>Intelligent, fast, and secure scheme matching powered by graph technology.</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => handleScroll('finder')}>Find My Match</button>
            <button className="btn-secondary" onClick={() => handleScroll('all-schemes')}>Explore All</button>
          </div>
        </div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </header>

      {/* Profile / Finder Section */}
      <section id="finder" className="finder-section section fade-in">
        <div className="container dual-col">
          <div className="form-container glass-card">
            <h2><i className="fa-solid fa-id-card"></i> Your Profile</h2>
            <p className="subtitle">Tell us about yourself to find matches.</p>
            <form id="profile-form" onSubmit={handleProfileSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required placeholder="Enter your full name" value={profileName} onChange={e => setProfileName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <select id="state" required value={profileState} onChange={e => setProfileState(e.target.value)}>
                  <option value="">Select State</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="All">Other/All India</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="income">Annual Income (₹)</label>
                <input type="number" id="income" required placeholder="e.g. 150000" value={profileIncome} onChange={e => setProfileIncome(e.target.value)} />
              </div>
              <div className="category-group">
                <label>Categories (Select at least 1)</label>
                <div className="chips" id="category-chips">
                  {['Farmer', 'Student', 'Women Entrepreneurs', 'BPL', 'Girl Child', 'Rural'].map(cat => (
                    <label className="chip" key={cat}>
                      <input type="checkbox" checked={profileCategories.includes(cat)} onChange={() => handleCategoryToggle(cat)} />
                      {cat === 'Rural' ? 'Rural / Unemployed' : cat}
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Scanning...' : 'Find Schemes'} <i className="fa-solid fa-wand-magic-sparkles"></i>
              </button>
            </form>
          </div>

          {/* Results & Recommendations Column */}
          <div className="results-container">
            <div className="tabs">
              <button className={`tab ${activeTab === 'matched' ? 'active' : ''}`} onClick={() => setActiveTab('matched')}>Eligible Matches</button>
              <button className={`tab ${activeTab === 'recommended' ? 'active' : ''}`} onClick={() => setActiveTab('recommended')}>
                <i className="fa-solid fa-share-nodes"></i> Smart Recommendations
              </button>
            </div>

            {activeTab === 'matched' && (
              <div id="matched-content" className="tab-content active">
                <div id="matched-grid" className="cards-grid">
                  {!hasSubmitted ? (
                    <div className="empty-state"><i className="fa-solid fa-magnifying-glass"></i><p>Submit your profile to see matches</p></div>
                  ) : matchedSchemes.length === 0 ? (
                    <div className="empty-state"><i className="fa-solid fa-folder-open"></i><p>No exact matches found. Check recommendations!</p></div>
                  ) : (
                    matchedSchemes.map(renderSchemeCard)
                  )}
                </div>
              </div>
            )}

            {activeTab === 'recommended' && (
              <div id="recommended-content" className="tab-content active">
                <div className="recommendation-banner glass-card">
                  <p><i className="fa-solid fa-robot"></i> <strong>TigerGraph Graph Engine</strong></p>
                  <p className="small">"Users similar to you also applied for these schemes:"</p>
                </div>
                <div id="recommended-grid" className="cards-grid">
                  {!hasSubmitted ? (
                    <div className="empty-state"><i className="fa-solid fa-diagram-project"></i><p>Submit profile to generate graph recommendations.</p></div>
                  ) : recommendedSchemes.length === 0 ? (
                    <div className="empty-state"><p>No recommendations available currently.</p></div>
                  ) : (
                    recommendedSchemes.map(renderSchemeCard)
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Schemes Section */}
      <section id="all-schemes" className="all-schemes-section section fade-in">
        <h2 className="title-center">Browse All Schemes</h2>
        <div className="container" style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '25px' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <input type="text" id="scheme-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by keywords, e.g. 'Kisan'..."
                style={{ padding: '15px', borderRadius: '12px', width: '100%', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid var(--glass-border)' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}>
                <option value="" style={{ color: 'black' }}>All States / Regions</option>
                <option value="Bihar" style={{ color: 'black' }}>Bihar</option>
                <option value="Telangana" style={{ color: 'black' }}>Telangana</option>
                <option value="Odisha" style={{ color: 'black' }}>Odisha</option>
                <option value="Madhya Pradesh" style={{ color: 'black' }}>Madhya Pradesh</option>
                <option value="Andhra Pradesh" style={{ color: 'black' }}>Andhra Pradesh</option>
              </select>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}>
                <option value="" style={{ color: 'black' }}>All Categories</option>
                <option value="Farmer" style={{ color: 'black' }}>Farmer</option>
                <option value="Student" style={{ color: 'black' }}>Student</option>
                <option value="Women Entrepreneurs" style={{ color: 'black' }}>Women Entrepreneurs</option>
                <option value="BPL" style={{ color: 'black' }}>BPL</option>
                <option value="Girl Child" style={{ color: 'black' }}>Girl Child</option>
                <option value="Health" style={{ color: 'black' }}>Health</option>
              </select>
            </div>
          </div>
        </div>
        <div id="all-schemes-grid" className="cards-grid-large container">
          {filteredSchemes.map(renderSchemeCard)}
          {filteredSchemes.length === 0 && allSchemes.length > 0 && (
            <div style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>No schemes found matching your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}
