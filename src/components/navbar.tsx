'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { usePathname } from 'next/navigation';

function Navbar() {
    const { data: session } = useSession();
    const user: User = session?.user as User;
    const pathname = usePathname()
    const [isDashboard, setIsDashboard] = useState(false);

    useEffect(() => {
        setIsDashboard(pathname === '/dashboard');
    }, [pathname]);
    
    return (
        <>
        <nav className="p-3 md:p-3 shadow-md bg-gray-900 text-white">
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
                            <Button className={`${isDashboard ? 'hidden' : 'block'} w-full md:w-auto bg-slate-100 text-black`} variant='outline'>
                                <Link href='/dashboard' className="font-bold mb-4 md:mb-0">Dashboard</Link>
                            </Button>
                            <Button onClick={() => signOut()} className="font-bold w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
                    </Link>
                )}
            </div>
        </nav>
    </>
    );
}

export default Navbar;