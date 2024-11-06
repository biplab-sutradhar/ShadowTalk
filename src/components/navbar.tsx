import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Ghost, Moon, Settings, Sun, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";

function Navbar({ isClosed }: { isClosed: boolean }) {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className=" top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           
          <motion.div 
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <Link href="/"  className={`${isClosed ? 'pl-44' : 'pl-9'} flex items-center justify-center `}>

            {/* <div  className={`${isClosed ? 'pl-28' : ''} flex items-center `}></div> */}
              <Ghost className="h-6 w-6 text-purple-600" />
              <span className="ml-1 font-bold text-xl">ShadowTalk</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:flex items-center space-x-4"
          >
            {session ? (
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="text-sm font-medium"
                        >
                          Menu
                        </motion.span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4 w-48 space-y-2">
                          <Link href="/dashboard" 
                            className="block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Dashboard
                          </Link>
                          <Link href="/settings"
                            className="block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Settings
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="rounded-full"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => signOut()}
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-in">
                  <Button 
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            variants={itemVariants}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-2 space-y-2">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      Settings
                    </Button>
                  </Link>
                  <Button
                    onClick={() => signOut()}
                    variant="default"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button 
                    variant="default"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;