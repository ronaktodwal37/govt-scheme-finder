const fs = require('fs');

const indexNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html" class="active">Home</a></li>
            <li><a href="index.html#find-schemes">Find Schemes</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="forum.html">Community</a></li>
            <li><a href="help-centers.html">CSC Centers</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const aboutNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html" class="active">About Us</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const contactNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html" class="active">Contact Us</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const dashboardNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="dashboard.html" class="active btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const forumNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="forum.html" class="active">Community</a></li>
            <li><a href="help-centers.html">CSC Centers</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const helpNav = `    <nav class="navbar">
        <div class="logo">
            <i class="fa-solid fa-landmark"></i> GovAssist
        </div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="forum.html">Community</a></li>
            <li><a href="help-centers.html" class="active">CSC Centers</a></li>
            <li><a href="dashboard.html" class="btn-primary" style="padding: 10px 20px;">Dashboard</a></li>
        </ul>
    </nav>`;

const map = {
    'public/index.html': indexNav,
    'public/about.html': aboutNav,
    'public/contact.html': contactNav,
    'public/dashboard.html': dashboardNav,
    'public/forum.html': forumNav,
    'public/help-centers.html': helpNav
};

for (const [file, nav] of Object.entries(map)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, nav);
    fs.writeFileSync(file, content);
}
console.log("Navbars reverted successfully!");
