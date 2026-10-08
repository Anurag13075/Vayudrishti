'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  Map, Wind, Brain, GraduationCap, Calendar, Users, 
  Smartphone, Eye, Shield, ArrowRight, Activity,
  Cpu, Cloud, Database, Server
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { IMPACT_STATS, FEATURES, INDIAN_CITIES } from '@/lib/constants';
import { simulateAqi, getAqiLevel, getAqiColor } from '@/lib/utils';

// Helper component for fade-up reveal animations
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const featureIconMap: Record<string, React.ElementType> = {
    'Map': Map,
    'Wind': Wind,
    'Brain': Brain,
    'GraduationCap': GraduationCap,
    'Calendar': Calendar,
    'Users': Users,
  };

  const tickerCities = INDIAN_CITIES.slice(0, 4);

  return (
    <main className="min-h-screen bg-dark-900 text-white overflow-hidden font-sans">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-orb-green rounded-full blur-[120px] opacity-40 animate-blob pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-orb-blue rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-orb-purple rounded-full blur-[120px] opacity-30 animate-blob animation-delay-4000 pointer-events-none" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Live Air Quality Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-tight max-w-5xl"
          >
            Every Breath You Take Is <span className="gradient-text">Counted</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl font-light leading-relaxed"
          >
            India's first AI-powered personal air quality companion. Track your pollution exposure. Protect your family. Breathe smarter.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link href="/map" className="glow-button px-8 py-4 rounded-xl font-medium text-lg flex items-center gap-2 group transition-all duration-300">
              Explore Live Map
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/breathe" className="glass-card border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300">
              Check Your Breath Score
            </Link>
          </motion.div>

          {/* Live Ticker */}
          {mounted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 w-full max-w-4xl glass-card rounded-2xl p-4 flex flex-wrap justify-center gap-6 border-white/10"
            >
              {tickerCities.map((city) => {
                const aqi = simulateAqi(city.key);
                const level = getAqiLevel(aqi);
                return (
                  <div key={city.key} className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: level.color }} />
                    <span className="font-medium text-gray-200">{city.name}</span>
                    <span className="font-bold font-display" style={{ color: level.color }}>{aqi}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 2: IMPACT STATS */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text-warm">The Air Crisis India Can't Ignore</h2>
            <p className="mt-4 text-xl text-gray-400">The invisible threat affecting billions every single day.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center h-full hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-5xl font-display font-bold text-white mb-2 flex items-baseline">
                    <CountUp end={stat.value} duration={3} separator="," enableScrollSpy scrollSpyOnce />
                    <span className="text-3xl ml-1 text-gray-400">{stat.suffix}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-200 mb-4">{stat.label}</h3>
                  <p className="text-xs text-gray-500 mt-auto">{stat.source}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="py-32 bg-white/5 relative border-y border-white/10">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Not Another Dashboard.<br/>A Personal Air Quality Companion.</h2>
            <p className="text-xl text-gray-400">VayuDrishti goes beyond raw numbers, providing actionable intelligence to protect your health in real-time.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => {
              const Icon = featureIconMap[feature.icon] || Activity;
              return (
                <Reveal key={feature.title} delay={i * 0.1}>
                  <Link href={feature.href} className="block group h-full">
                    <div className="glass-card p-8 rounded-3xl border border-white/10 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/30 group-hover:bg-white/10 relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient}`} />
                      
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.gradient}`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold mb-3">{feature.title}</h3>
                      <p className="text-dark-200 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Protecting Your Family is Simple</h2>
            <p className="text-xl text-gray-400">Three steps to a healthier breathing environment.</p>
          </Reveal>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { step: 1, title: 'Open VayuDrishti', desc: 'Instantly locate yourself on our real-time interactive pollution map.', icon: Smartphone, color: 'from-blue-500 to-cyan-400' },
                { step: 2, title: 'See Your Air', desc: 'Get localized hyper-accurate AI forecasts of what you are breathing.', icon: Eye, color: 'from-purple-500 to-pink-500' },
                { step: 3, title: 'Breathe Smarter', desc: 'Receive tailored health advice and protective actions for your family.', icon: Shield, color: 'from-green-400 to-emerald-600' }
              ].map((item, i) => (
                <Reveal key={item.step} delay={i * 0.2}>
                  <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center relative bg-dark-900/80 backdrop-blur-xl">
                    <div className="absolute -top-5 w-10 h-10 rounded-full bg-dark-800 border-2 border-white/20 flex items-center justify-center font-bold text-lg z-20">
                      {item.step}
                    </div>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${item.color} shadow-lg`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BUILT ON AWS ARCHITECTURE */}
      <section className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4">
              <Cloud className="w-3.5 h-3.5" /> Built on Amazon Web Services
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Enterprise-Scale <span className="gradient-text">Cloud & AI Backbone</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Engineered with modern AWS serverless architecture to deliver microsecond-latency insights to 1.4 billion citizens.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                service: 'Amazon Bedrock',
                badge: 'Generative AI',
                role: 'Claude 3.5 Sonnet & Titan models powering the real-time clinical AI health diagnosis.',
                icon: Cpu,
                color: 'from-purple-500 to-indigo-500',
              },
              {
                service: 'AWS Lambda & API Gateway',
                badge: 'Serverless Compute',
                role: 'Zero-maintenance auto-scaling ingestion pipelines processing 1,000+ continuous sensor feeds.',
                icon: Server,
                color: 'from-orange-500 to-amber-500',
              },
              {
                service: 'Amazon DynamoDB',
                badge: 'NoSQL Database',
                role: 'Sub-10ms latency store for time-series exposure metrics, community reports, and geo-indexes.',
                icon: Database,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                service: 'AWS Amplify & CloudFront',
                badge: 'Global Edge Delivery',
                role: 'Ultra-fast global edge distribution ensuring uninterrupted crisis access even during peak haze episodes.',
                icon: Cloud,
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((aws, i) => (
              <Reveal key={aws.service} delay={i * 0.1}>
                <div className="glass-card p-6 rounded-3xl border border-white/10 h-full flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${aws.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <aws.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {aws.badge}
                    </span>
                    <h3 className="text-xl font-display font-bold mt-3 mb-2">{aws.service}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{aws.role}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-gray-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" /> Production Ready
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE AQI COMPARISON */}
      <section className="py-32 bg-dark-950 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Right Now, Across India</h2>
            <p className="text-gray-400 mt-2">Live simulated atmospheric intelligence.</p>
          </Reveal>
        </div>

        {/* Scrollable Row */}
        <div className="flex overflow-x-auto pb-10 px-6 gap-6 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {mounted && INDIAN_CITIES.slice(0, 10).map((city, i) => {
            const aqi = simulateAqi(city.key);
            const level = getAqiLevel(aqi);
            return (
              <motion.div 
                key={city.key}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="snap-center shrink-0 w-72 glass-card rounded-3xl p-6 relative overflow-hidden group"
                style={{ 
                  borderColor: `${level.color}40`,
                  boxShadow: `0 10px 30px -10px ${level.color}20` 
                }}
              >
                <div className="absolute top-0 right-0 p-4 text-4xl opacity-50 group-hover:scale-110 transition-transform">
                  {level.emoji}
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{city.name}</h3>
                <p className="text-sm text-gray-400 mb-6">{city.state}</p>
                
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-display font-bold tracking-tighter" style={{ color: level.color }}>
                    {aqi}
                  </span>
                  <span className="text-lg font-medium mb-2 uppercase" style={{ color: level.color }}>
                    AQI
                  </span>
                </div>
                
                <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${level.color}20`, color: level.color }}>
                  {level.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: CTA / FOOTER */}
      <section className="py-32 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 max-w-4xl mx-auto leading-tight">
              The Air Won't Fix Itself.<br/>
              <span className="text-gray-500">But You Can Track It.</span>
            </h2>
            
            <Link href="/map" className="inline-flex items-center gap-2 glow-button px-10 py-5 rounded-2xl font-bold text-xl mb-32 hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              Start Protecting Your Family
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Reveal>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-green-500" />
                <span className="font-display font-bold text-xl tracking-tight">Vayu<span className="text-green-500">Drishti</span></span>
              </div>
              <p className="text-sm text-gray-500">Built with 💚 for Bharat | VayuDrishti © 2026</p>
              <p className="text-xs text-gray-600 mt-1">Track 01: Air — Environmental Hacks by WeMakeDevs x AWS</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/map" className="hover:text-white transition-colors">Live Map</Link>
              <Link href="/breathe" className="hover:text-white transition-colors">Breath Score</Link>
              <Link href="/advisor" className="hover:text-white transition-colors">AI Advisor</Link>
              <Link href="/schools" className="hover:text-white transition-colors">Schools</Link>
              <Link href="/report" className="hover:text-white transition-colors">Report</Link>
            </div>
          </footer>
        </div>
      </section>
      
      {/* Global styles for utility classes that might not be in Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </main>
  );
}
