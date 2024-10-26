"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 

const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter();

    const handler = () => {
        router.push('/login')
    }
    
    const links = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'News', path: '/news' },
        { title: 'Contact', path: '/contact' } // Unique path for Contact
    ];

    return (
        <div>
            <div className="navbar bg-gray-900 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <Link className={`${pathName === link.path ? "text-red-600" : ""}`} href={link.path}>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">NewsMedia</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link href={link.path} className={`${pathName === link.path ? "text-red-600" : ""}`}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link href="/signup"><button className="btn ">Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
