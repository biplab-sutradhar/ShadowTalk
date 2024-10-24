'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Moon, Sun } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

function Navbar() {
    const { data: session } = useSession();
    const user: User = session?.user as User;
    const pathname = usePathname();
    const [isDashboard, setIsDashboard] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setTimeout(() => {
            setIsDashboard(pathname === '/dashboard');  
        }, 1500);
      
    }, [pathname]);

    return (
        <nav className="p-3 shadow-md bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
                    ShadowTalk
                </Link>
                {session ? (
                    <>
                        <span className="mr-4">
                            Welcome, {user.username || user.email}
                        </span>
                        <div className='flex gap-4'>
                            {!isDashboard && (
                                <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                    <Link href='/dashboard' className="font-bold">Dashboard</Link>
                                </Button>
                            )}

                            <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </Button>

                            <Button onClick={() => signOut()} className="font-bold w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Login</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
