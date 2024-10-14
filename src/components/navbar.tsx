<<<<<<< HEAD
'use client';
=======
'use client'
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
<<<<<<< HEAD
import { Moon, Sun } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
=======
import { usePathname } from 'next/navigation';
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

function Navbar() {
    const { data: session } = useSession();
    const user: User = session?.user as User;
<<<<<<< HEAD
    const pathname = usePathname();
    const [isDashboard, setIsDashboard] = useState(false);
    const { theme, setTheme } = useTheme();
=======
    const pathname = usePathname()
    const [isDashboard, setIsDashboard] = useState(false);
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

    useEffect(() => {
        setIsDashboard(pathname === '/dashboard');
    }, [pathname]);
<<<<<<< HEAD

    return (
        <nav className="p-3 shadow-md bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
                    ShadowTalk
=======
    
    return (
        <>
        <nav className="p-3 md:p-3 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
                  ShadowTalk
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
                </Link>
                {session ? (
                    <>
                        <span className="mr-4">
                            Welcome, {user.username || user.email}
                        </span>
                        <div className='flex gap-4'>
<<<<<<< HEAD
                            {!isDashboard && (
                                <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                    <Link href='/dashboard' className="font-bold">Dashboard</Link>
                                </Button>
                            )}

                            <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </Button>

=======
                            <Button className={`${isDashboard ? 'hidden' : 'block'} w-full md:w-auto bg-slate-100 text-black`} variant='outline'>
                                <Link href='/dashboard' className="font-bold mb-4 md:mb-0">Dashboard</Link>
                            </Button>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
                            <Button onClick={() => signOut()} className="font-bold w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <Link href="/sign-in">
<<<<<<< HEAD
                        <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Login</Button>
=======
                        <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
                    </Link>
                )}
            </div>
        </nav>
<<<<<<< HEAD
    );
}

export default Navbar;
=======
    </>
    );
}

export default Navbar;
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
