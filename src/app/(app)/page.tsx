"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquareOff,
  Moon,
  Sun,
  ShieldCheck,
  Timer,
  UserX,
  Key,
  Lock,
  Ghost,
  Eye,
  EyeOff,
  Fingerprint,
  Trash2,
  AlertCircle,
  Check
} from 'lucide-react';

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' ||
        (!('darkMode' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const features = [
    {
      icon: <UserX className="h-8 w-8" />,
      title: "Complete Anonymity",
      description: "No sign-up, no personal info. Stay completely anonymous while chatting."
    },
    {
      icon: <Timer className="h-8 w-8" />,
      title: "Self-Destructing Messages",
      description: "Messages automatically disappear after being read or after a set time."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Zero-Knowledge",
      description: "We can't read your messages. Ever. That's our promise."
    }
  ];

  const privacyFeatures = [
    {
      icon: <Key className="h-6 w-6" />,
      title: "End-to-End Encryption"
    },
    {
      icon: <Fingerprint className="h-6 w-6" />,
      title: "No Digital Footprint"
    },
    {
      icon: <Trash2 className="h-6 w-6" />,
      title: "Auto Message Cleanup"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
              <div className="flex items-center space-x-2">
                <EyeOff className="h-4 w-4" />
                <span>100% Anonymous</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Chat Freely,{" "}
              <span className="text-violet-500">Leave No Trace</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              The most secure anonymous messaging platform. No sign-up, no history, no traces. Just pure, private communication.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <motion.button
                className="bg-violet-500 text-white px-8 py-4 rounded-lg hover:bg-violet-600 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Ghost className="h-5 w-5" />
                <span>Start Anonymous Chat</span>
              </motion.button>
              <motion.a
                href="#how-it-works"
                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AlertCircle className="h-5 w-5" />
                <span>Learn More</span>
              </motion.a>
            </div>

            <div className="flex justify-center space-x-8">
              {privacyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  {feature.icon}
                  <span>{feature.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
 
        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Privacy First, Always
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-violet-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
 
        <section id="how-it-works" className="py-16">
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-violet-100 dark:bg-violet-900/40 p-4 rounded-full mb-4">
                  <Ghost className="h-8 w-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Create Room</h3>
                <p className="text-gray-600 dark:text-gray-400">Generate an anonymous chat room instantly</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-violet-100 dark:bg-violet-900/40 p-4 rounded-full mb-4">
                  <Key className="h-8 w-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Share Link</h3>
                <p className="text-gray-600 dark:text-gray-400">Send encrypted room link to your contact</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-violet-100 dark:bg-violet-900/40 p-4 rounded-full mb-4">
                  <MessageSquareOff className="h-8 w-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Chat & Vanish</h3>
                <p className="text-gray-600 dark:text-gray-400">Messages disappear after being read</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Eye className="h-6 w-6" />, text: "No Data Collection" },
              { icon: <Lock className="h-6 w-6" />, text: "Military-Grade Encryption" },
              { icon: <Fingerprint className="h-6 w-6" />, text: "No IP Logging" },
              { icon: <Check className="h-6 w-6" />, text: "Open Source" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-violet-500">{item.icon}</div>
                <span className="text-gray-600 dark:text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Platform</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">How it works</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Security</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Features</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Privacy</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Policy</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Encryption</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Data handling</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Blog</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">FAQ</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Support</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Terms</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Privacy</a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-violet-500">Guidelines</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Ghost className="h-5 w-5 text-violet-500" />
              <span>ShadowTalk</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 ShadowTalk. Zero logs. Zero traces.
            </div>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/shadowtalk"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-500"
                whileHover={{ scale: 1.1 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Lock className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#security"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-500"
                whileHover={{ scale: 1.1 }}
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
