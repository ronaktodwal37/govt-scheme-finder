const fs = require('fs');
const files = ['public/index.html', 'public/about.html', 'public/contact.html', 'public/dashboard.html', 'public/forum.html', 'public/help-centers.html'];

const newNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#find-schemes">Find Schemes</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="forum.html">Community</a></li>
            <li><a href="help-centers.html">CSC Centers</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const newFooter = `    <!-- Footer Section -->
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-col">
                <h3><i class="fa-solid fa-landmark" style="color:var(--primary); margin-right:8px;"></i> GovAssist</h3>
                <p>Empowering citizens by simplifying access to government schemes, subsidies, and essential public services through intelligent technology.</p>
                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#all-schemes">Browse Search</a></li>
                    <li><a href="forum.html">Community Forum</a></li>
                    <li><a href="help-centers.html">CSC Locator</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Support</h3>
                <ul class="footer-links">
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="help-centers.html">Help Centers</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Newsletter</h3>
                <p style="margin-bottom:15px;">Subscribe to get the latest scheme updates and application deadlines.</p>
                <div class="input-group" style="display:flex; gap:10px;">
                    <input type="email" placeholder="Your email address..." style="padding:10px; border-radius:8px; width:100%;">
                    <button class="btn-primary" style="padding:10px 15px;"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 GovAssist Platform. All rights reserved. Not an official government website.
        </div>
    </footer>
    <script src="app.js"></script>
</body>`;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    // Replace nav
    content = content.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, newNav);

    // Replace footer or insert
    if (content.match(/<footer[\s\S]*?<\/body>/)) {
        content = content.replace(/<footer[\s\S]*?<\/body>/, newFooter);
    } else {
        if (content.match(/<script src="app\.js"><\/script>\s*<\/body>/)) {
            content = content.replace(/<script src="app\.js"><\/script>\s*<\/body>/, newFooter);
        } else {
            content = content.replace(/<\/body>/, newFooter);
        }
    }

    fs.writeFileSync(f, content);
});
console.log("Done updating layout!");
