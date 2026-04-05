document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });

    // Chatbot Toggle
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('closed');
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.add('closed');
        });
    }

    // Chat Logic
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat');
    const chatBody = document.getElementById('chat-body');

    async function sendMsg() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        appendChat(msg, 'user');
        chatInput.value = '';

        // Typing indication
        const typingItem = document.createElement('div');
        typingItem.className = 'chat-msg bot';
        typingItem.textContent = 'Typing...';
        chatBody.appendChild(typingItem);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            const data = await res.json();

            chatBody.removeChild(typingItem);
            appendChat(data.reply, 'bot');
        } catch (e) {
            chatBody.removeChild(typingItem);
            appendChat('Error connecting to assistant.', 'bot');
        }
    }

    if (sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', sendMsg);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMsg();
        });
    }

    function appendChat(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }


    // Form Submission for Matching & Recommendation
    const form = document.getElementById('profile-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const state = document.getElementById('state').value;
            const income = parseInt(document.getElementById('income').value);

            // Collect checked categories
            const checkedCategories = Array.from(document.querySelectorAll('#category-chips input:checked')).map(input => input.value);

            if (checkedCategories.length === 0) {
                showToast("Please select at least one category.", false);
                return;
            }

            const profile = { name, state, income, category: checkedCategories };
            localStorage.setItem('userProfile', JSON.stringify(profile)); // Save to local storage for Dashboard

            // 1. Fetch eligible matches
            fetchMatches(profile);

            // 2. Fetch Graph Recommendations
            fetchRecommendations(profile);
        });
    }

    async function fetchMatches(profile) {
        const matchedGrid = document.getElementById('matched-grid');
        renderSkeletons(matchedGrid, 2);

        try {
            const res = await fetch('/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            const schemes = await res.json();
            renderSchemes(schemes, matchedGrid);
        } catch (e) {
            console.error(e);
            matchedGrid.innerHTML = `<p style="color:red">Error fetching matches.</p>`;
        }
    }

    async function fetchRecommendations(profile) {
        const recGrid = document.getElementById('recommended-grid');
        renderSkeletons(recGrid, 2);

        try {
            const encodedProfile = encodeURIComponent(JSON.stringify(profile));
            const res = await fetch(`/recommend?profile=${encodedProfile}`);
            const recommendations = await res.json();
            renderSchemes(recommendations, recGrid, true);
        } catch (e) {
            console.error(e);
            recGrid.innerHTML = `<p style="color:red">Graph query failed.</p>`;
        }
    }

    // Initial Fetch All Schemes
    async function fetchAllSchemes() {
        const allGrid = document.getElementById('all-schemes-grid');
        if (!allGrid) return;
        renderSkeletons(allGrid, 6);
        try {
            const res = await fetch('/schemes');
            window.allSchemes = await res.json();
            renderSchemes(window.allSchemes, allGrid);
        } catch (e) {
            allGrid.innerHTML = `<p style="color:red">Could not load schemes.</p>`;
        }
    }

    // Live Search Filter for All Schemes
    const searchInput = document.getElementById('scheme-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const allGrid = document.getElementById('all-schemes-grid');
            if (!window.allSchemes) return;

            const filtered = window.allSchemes.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.state.toLowerCase().includes(query) ||
                s.category.some(c => c.toLowerCase().includes(query))
            );
            renderSchemes(filtered, allGrid);
        });
    }

    fetchAllSchemes();


    // Utility rendering
    function renderSkeletons(container, count) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            container.innerHTML += `<div class="skeleton-card skeleton"></div>`;
        }
    }

    function renderSchemes(schemes, container, isRec = false) {
        container.innerHTML = '';
        if (schemes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No schemes found matching criteria.</p>
                </div>
            `;
            return;
        }

        schemes.forEach(s => {
            const card = document.createElement('div');
            card.className = 'scheme-card';

            const badgeColor = isRec ? 'style="background: rgba(236, 72, 153, 0.2); color: var(--secondary);"' : '';

            card.innerHTML = `
                <div class="scheme-header">
                    <div class="scheme-title">${s.name}</div>
                    ${isRec ? `<div class="scheme-tag" ${badgeColor}><i class="fa-solid fa-diagram-project"></i> By Graph</div>` :
                    `<div class="scheme-tag"><i class="fa-solid fa-circle-check"></i> Eligible</div>`}
                </div>
                <div class="scheme-details">
                    <p><i class="fa-solid fa-map-location-dot"></i> State: ${s.state}</p>
                    <p><i class="fa-solid fa-wallet"></i> Max Income: ${s.income_limit ? '₹' + s.income_limit.toLocaleString() : 'No limit'}</p>
                    <p><i class="fa-solid fa-gift"></i> Benefit: ${s.benefits}</p>
                </div>
                <button class="save-btn" onclick="saveScheme('${s.id}')"><i class="fa-solid fa-bookmark"></i> Save Scheme</button>
            `;
            container.appendChild(card);
        });
    }

    // Dashboard Logic
    const initDashboard = () => {
        const dashboardName = document.getElementById('dashboard-name');
        const dashboardGrid = document.getElementById('dashboard-schemes-grid');

        if (dashboardName && dashboardGrid) {
            const profileStr = localStorage.getItem('userProfile');
            if (profileStr) {
                const profile = JSON.parse(profileStr);
                dashboardName.innerText = `Welcome back, ${profile.name}!`;
            } else {
                dashboardName.innerText = `Welcome back!`;
            }

            const savedSchemesStr = localStorage.getItem('savedSchemes');
            if (savedSchemesStr && savedSchemesStr !== '[]') {
                const schemeIds = JSON.parse(savedSchemesStr);
                // We need all schemes to find by ID
                fetch('/schemes').then(res => res.json()).then(all => {
                    const saved = all.filter(s => schemeIds.includes(s.id));
                    dashboardGrid.innerHTML = '';
                    saved.forEach(s => {
                        dashboardGrid.innerHTML += `
                            <div class="scheme-card">
                                <div class="scheme-header">
                                    <div class="scheme-title">${s.name}</div>
                                    <div class="scheme-tag"><i class="fa-solid fa-clock"></i> Saved</div>
                                </div>
                                <p class="text-muted" style="margin-bottom:15px; font-size:14px;">Review eligibility documents.</p>
                                <button class="btn-primary w-100">Review</button>
                            </div>
                        `;
                    });
                });
            } else {
                dashboardGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fa-solid fa-bookmark"></i>
                        <p>You haven't saved any schemes yet.</p>
                    </div>
                `;
            }
        }
    };
    initDashboard();

    // Forum Logic
    const initForum = () => {
        const forumForm = document.getElementById('forum-form');
        const forumContainer = document.getElementById('forum-posts-container');

        if (forumContainer) {
            // Load existing posts from local storage or set empty state
            const loadPosts = () => {
                const savedPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
                if (savedPosts.length > 0) {
                    // Prepend saved posts since they are newer
                    savedPosts.forEach(post => {
                        forumContainer.insertAdjacentHTML('afterbegin', post);
                    });
                }
            };
            loadPosts();

            if (forumForm) {
                forumForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const title = document.getElementById('forum-title').value;
                    const desc = document.getElementById('forum-desc').value;
                    const profileStr = localStorage.getItem('userProfile');
                    const name = profileStr ? JSON.parse(profileStr).name : "Anonymous User";

                    const newPostHtml = `
                    <div class="glass-card post-card" style="border-color:var(--success);">
                        <div class="post-votes">
                            <i class="fa-solid fa-chevron-up" style="color:var(--text-muted);cursor:pointer;"></i>
                            <strong style="margin:5px 0;">0</strong>
                            <i class="fa-solid fa-chevron-down" style="color:var(--text-muted);cursor:pointer;"></i>
                        </div>
                        <div class="post-content">
                            <h3><span class="tag" style="background:transparent; border:1px solid var(--success); color:var(--success);">NEW</span> ${title}</h3>
                            <p style="color:var(--text-muted); margin-top:5px;">${desc}</p>
                            <div class="post-meta">
                                <span class="tag">General</span> &bull; Posted by ${name} &bull; Just now
                            </div>
                        </div>
                    </div>`;

                    forumContainer.insertAdjacentHTML('afterbegin', newPostHtml);

                    // Save to local storage
                    const savedPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
                    savedPosts.push(newPostHtml);
                    localStorage.setItem('forumPosts', JSON.stringify(savedPosts));

                    document.getElementById('new-post-form').style.display = 'none';
                    forumForm.reset();
                    showToast("Post added to the forum successfully!");
                });
            }
        }
    };
    initForum();

    // Map Search Logic
    const initMapSearch = () => {
        const mapForm = document.getElementById('map-search-form');
        const mapInput = document.getElementById('map-search-input');
        const mapIframe = document.querySelector('.map-placeholder iframe');

        if (mapForm && mapInput && mapIframe) {
            mapForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = encodeURIComponent(mapInput.value.trim());
                // Update iframe source
                mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500!2d85.12!3d25.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&q=${query}`;
                showToast("Searching for centers near: " + mapInput.value);
            });
        }
    };
    initMapSearch();

});

// Save Logic
async function saveScheme(id) {
    try {
        const res = await fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ schemeId: id })
        });
        const data = await res.json();

        // Local storage saving
        let saved = JSON.parse(localStorage.getItem('savedSchemes') || '[]');
        if (!saved.includes(id)) {
            saved.push(id);
            localStorage.setItem('savedSchemes', JSON.stringify(saved));
        }

        showToast(data.message, true);
    } catch (e) {
        showToast("Error saving scheme.", false);
    }
}

// Toast Notification Logic
function showToast(message, isSuccess = true) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = isSuccess ? 'var(--success)' : '#ef4444'; // Red for error

    toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-check-circle' : 'fa-circle-exclamation'}"></i> ${message}`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
