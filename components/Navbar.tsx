"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname() || '/';

    // Determine which links to show based on the page context
    const isHome = pathname === '/';
    const isAboutOrContact = pathname === '/about' || pathname === '/contact';
    const isForumOrHelp = pathname === '/forum' || pathname === '/help-centers';

    return (
        <nav className="navbar">
            <div className="logo">
                <i className="fa-solid fa-landmark"></i> GovAssist
            </div>
            <ul className="nav-links">
                <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>

                {isHome && <li><Link href="/#find-schemes">Find Schemes</Link></li>}

                {(isHome || isAboutOrContact) && (
                    <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About Us</Link></li>
                )}

                {isAboutOrContact && (
                    <li><Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact Us</Link></li>
                )}

                {(isHome || isForumOrHelp) && (
                    <li><Link href="/forum" className={pathname === '/forum' ? 'active' : ''}>Community</Link></li>
                )}

                {(isHome || isForumOrHelp) && (
                    <li><Link href="/help-centers" className={pathname === '/help-centers' ? 'active' : ''}>CSC Centers</Link></li>
                )}

                <li><Link href="/dashboard" className={`btn ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link></li>
            </ul>
        </nav>
    );
}
