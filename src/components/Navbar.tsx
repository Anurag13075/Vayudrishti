"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const navItems = [
  { label: "BreatheClean Map", href: "/map" },
  { label: "SpiroVision™ & Bio-Sync", href: "/breathe" },
  { label: "School Sentinel", href: "/schools" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[#e5e5e0] shadow-2xs"
            : "bg-[#fbfbf9]/80 backdrop-blur-sm border-b border-[#e5e5e0]/60"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Logo size="sm" showBadge={true} href="/" />

            {/* Desktop Center Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 border border-neutral-200/80 p-1 rounded-full">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? "text-neutral-950 bg-white shadow-xs font-semibold"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-white/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#111110] hover:bg-[#2b2b27] px-4 py-2 rounded-full transition-all hover:shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Map & Routes</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-neutral-200 px-6 py-6 md:hidden shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === item.href
                      ? "bg-neutral-100 text-neutral-900 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-neutral-100">
                <Link
                  href="/map"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-sm font-medium text-white bg-neutral-900 py-2.5 rounded-full"
                >
                  Explore Live Map
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacing below fixed navbar */}
      <div className="h-16" />
    </>
  );
}
