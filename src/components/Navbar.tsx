"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Map,
  Brain,
  GraduationCap,
  AlertTriangle,
  Menu,
  X,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Live Map", href: "/map", icon: Map },
  { label: "Breath Score", href: "/breathe", icon: Wind },
  { label: "AI Advisor", href: "/advisor", icon: Brain },
  { label: "Schools", href: "/schools", icon: GraduationCap },
  { label: "Report", href: "/report", icon: AlertTriangle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold tracking-tight text-white">
                  VayuDrishti
                </span>
                <span className="text-[10px] font-medium text-emerald-400/70 -mt-1 tracking-widest uppercase">
                  Air Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-emerald-400"
                        : "text-dark-200 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/map"
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                Check Air Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-dark-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="mx-4 mt-2 p-4 rounded-2xl bg-dark-800/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                            : "text-dark-200 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        <Icon className="w-4.5 h-4.5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <Link
                  href="/map"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                >
                  Check Air Quality Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
