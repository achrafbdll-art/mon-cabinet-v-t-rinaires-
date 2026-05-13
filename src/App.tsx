/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  ChevronDown, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight,
  PawPrint,
  Stethoscope,
  Activity,
  HeartPulse,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  MousePointer2,
  Sparkles,
  Heart,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TopBar = ({ onOpenSubscription }: { onOpenSubscription?: () => void }) => (
  <div className="bg-brand-teal-dark text-white/90 py-2.5 px-4 md:px-8 hidden lg:flex justify-between items-center text-[11px] font-medium border-b border-white/10 uppercase tracking-widest">
    <div className="flex items-center space-x-10">
      <a 
        href="https://goo.gl/maps/XYZ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-white transition-colors"
      >
        <MapPin size={12} className="text-white" />
        <span>Votre Adresse, Casablanca, Maroc</span>
      </a>
      <a 
        href="mailto:contact@votre-clinique.ma" 
        className="flex items-center space-x-2 hover:text-white transition-colors"
      >
        <Mail size={12} className="text-white" />
        <span>contact@votre-clinique.ma</span>
      </a>
      <a 
        href="tel:+212522252472" 
        className="flex items-center space-x-2 hover:text-white transition-colors"
      >
        <Phone size={12} className="text-white" />
        <span>+212 5 22 25 24 72</span>
      </a>
    </div>
    <div className="flex items-center space-x-6">
      <button 
        onClick={onOpenSubscription}
        className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-brand-teal/20 transition-all group scale-105"
      >
        <Sparkles size={12} className="text-amber-400" />
        <span className="text-white/90 group-hover:text-white font-black tracking-tight">Membre Premium</span>
      </button>
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-white transition-colors"><Facebook size={16} /></a>
        <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
      </div>
    </div>
  </div>
);

const Navbar = ({ onOpenAppointment, onOpenEmergency }: { onOpenAppointment?: () => void, onOpenEmergency?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
      
      const sections = ['home', 'about', 'services', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home', id: 'home' },
    { name: 'À Propos', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Urgence', isEmergency: true },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      setIsMobileMenuOpen(false);
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-3 border-b border-brand-teal/5' : 'bg-transparent py-6 lg:top-10'}`}>
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-teal/10 z-[60]">
        <motion.div 
          className="h-full bg-brand-teal origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative">
            <PawPrint className={isScrolled ? 'text-brand-teal' : 'text-white'} size={32} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className={`text-[9px] items-center gap-1 font-light uppercase tracking-[0.25em] leading-none mb-1 ${isScrolled ? 'text-brand-navy/60' : 'text-white/80'}`}>
              Cabinet vétérinaire
            </span>
            <h1 className={`text-xl lg:text-2xl font-bold tracking-tight leading-none ${isScrolled ? 'text-brand-navy' : 'text-white'}`}>
              Cabinet Vétérinaire
            </h1>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => {
                if (link.isEmergency) {
                  e.preventDefault();
                  onOpenEmergency?.();
                } else if (link.href) {
                  handleNavClick(e, link.href);
                }
              }}
              className={`relative font-bold text-[12px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                link.isEmergency 
                  ? 'text-red-500 hover:text-red-600' 
                  : (isScrolled ? 'text-brand-navy hover:text-brand-teal' : 'text-white hover:text-brand-teal/80')
              } ${activeSection === link.id ? 'text-brand-teal' : ''}`}
            >
              {link.name}
              {activeSection === link.id && !link.isEmergency && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-teal rounded-full"
                />
              )}
              {link.isEmergency && (
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-red-500 rounded-full" 
                />
              )}
            </a>
          ))}
          <button 
            onClick={onOpenAppointment}
            className={`px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 relative group overflow-hidden ${
              isScrolled 
                ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-brand-teal-dark' 
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-brand-teal'
            }`}
          >
            <span className="relative z-10">RDV</span>
            {!isScrolled && (
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-2.5 rounded-xl transition-all ${isScrolled ? 'text-brand-navy bg-brand-stone' : 'text-white bg-white/10 backdrop-blur-md'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 bg-white/95 backdrop-blur-2xl rounded-[32px] border border-brand-stone shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            <div className="p-6 space-y-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`flex justify-between items-center text-lg font-bold p-4 rounded-2xl transition-all group ${
                    link.isEmergency 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-brand-stone/40 text-brand-navy hover:bg-brand-teal-light hover:text-brand-teal'
                  }`}
                  onClick={(e) => {
                    if (link.isEmergency) {
                      e.preventDefault();
                      onOpenEmergency?.();
                      setIsMobileMenuOpen(false);
                    } else if (link.href) {
                      handleNavClick(e, link.href);
                    }
                  }}
                >
                  {link.name}
                  {link.isEmergency ? (
                    <Activity size={20} className="text-red-400 group-hover:scale-110 transition-transform" />
                  ) : (
                    <ArrowRight size={20} className="text-brand-teal/40 group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              ))}
              
              <div className="pt-6 flex flex-col gap-4 border-t border-brand-stone/50 mt-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-navy hover:bg-brand-teal hover:text-white transition-all"><Facebook size={20} /></a>
                    <a href="#" className="w-12 h-12 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-navy hover:bg-brand-teal hover:text-white transition-all"><Instagram size={20} /></a>
                  </div>
                  <a href="tel:+212522252472" className="flex items-center gap-3 bg-brand-navy text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-brand-navy/20">
                    <Phone size={18} />
                    <span>APPEL</span>
                  </a>
                </div>
                <button 
                  onClick={onOpenAppointment}
                  className="w-full flex items-center justify-center gap-3 bg-brand-teal text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-brand-teal/20 uppercase tracking-widest"
                >
                  <Sparkles size={18} />
                  <span>Prendre RDV</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenAppointment }: { onOpenAppointment?: () => void }) => {
  const images = [
    "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000"
  ];
  
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] lg:min-h-screen bg-brand-teal overflow-hidden flex items-center" id="home">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-teal" />
        
        {/* Paw Print (Zellige Style) Overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-[1]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 4c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm16 0c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 22c5.5 0 10-4.5 10-10 0-3.3-2.7-6-6-6h-8c-3.3 0-6 2.7-6 6 0 5.5 4.5 10 10 10z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-10 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1.05, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full relative"
            >
              <img 
                src={images[currentIdx]} 
                alt="Cabinet Vétérinaire" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Gradients for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/80 via-transparent to-brand-teal/20 lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/60 via-transparent to-transparent hidden lg:block" />
            </motion.div>
          </AnimatePresence>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-10 right-10 z-20 flex gap-3">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`group relative h-2 transition-all duration-500 overflow-hidden ${idx === currentIdx ? 'w-12 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'} rounded-full`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentIdx && (
                  <motion.div 
                    layoutId="progress"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-0 bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20 pt-12 lg:pt-0">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
            }
          }}
          className="max-w-3xl lg:max-w-4xl"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-[#00BFA5] rounded-full" />
            <span className="text-white font-bold tracking-[0.3em] uppercase text-xs">Vivre avec passion</span>
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[40px] sm:text-5xl md:text-7xl lg:text-[84px] xl:text-[96px] font-black text-white leading-[1.1] lg:leading-[1.05] mb-10 lg:mb-14 tracking-tighter drop-shadow-2xl"
          >
            Des soins d'exception pour vos <span className="font-serif italic text-white/90">compagnons de vie</span>
          </motion.h1>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-8"
          >
            <a 
              href="tel:+212522252472"
              className="group w-full sm:w-auto bg-[#00BFA5] text-white px-14 py-6 rounded-2xl font-black text-xs shadow-2xl hover:bg-brand-teal-dark transition-all transform hover:-translate-y-1.5 uppercase tracking-widest text-center flex items-center justify-center gap-3"
            >
              <Phone size={18} className="group-hover:rotate-12 transition-transform" />
              Appelez-nous
            </a>
            <button 
              onClick={onOpenAppointment}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-14 py-6 rounded-2xl font-black text-xs shadow-2xl hover:bg-white hover:text-brand-navy transition-all transform hover:-translate-y-1.5 uppercase tracking-widest text-center"
            >
              Prendre RDV
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em] [writing-mode:vertical-rl] animate-pulse">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-12 bg-gradient-to-b from-brand-teal/80 to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" id="about">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-stone/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Creative Image Composition */}
          <div className="relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Floating Dots Background */}
              <div className="absolute -top-10 -left-10 text-brand-teal opacity-20 hidden md:block">
                <div className="grid grid-cols-6 gap-3">
                  {[...Array(36)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />)}
                </div>
              </div>

              {/* Main Animated Blob Container */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10 mx-auto lg:mx-0 w-full max-w-[540px]"
              >
                <motion.div 
                  className="relative aspect-square overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white/50 backdrop-blur-sm group"
                  animate={{
                    borderRadius: [
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                      "60% 40% 30% 70% / 50% 30% 70% 50%",
                      "40% 60% 70% 30% / 40% 50% 60% 50%"
                    ]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=2000" 
                    alt="Cabinet Vétérinaire" 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Floating Tag */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-6 -left-6 md:left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden sm:flex items-center gap-4 border border-brand-stone"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
                    <Heart className="animate-pulse" size={24} />
                  </div>
                  <div>
                    <p className="font-black text-brand-navy leading-none">15+ Ans</p>
                    <p className="text-[10px] text-brand-slate uppercase font-bold tracking-widest mt-1">D'Expertise</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 border-2 border-brand-teal/10 rounded-full hidden lg:block" />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 bg-brand-teal/5 rounded-full mb-8">
              <span className="w-2 h-2 bg-brand-teal rounded-full animate-ping" />
              <span className="text-brand-teal font-black uppercase tracking-[0.2em] text-[10px]">
                Découvrez notre univers
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl mb-8 text-brand-navy font-black tracking-tighter leading-[0.95]">
              Bienvenue au <br />
              <span className="font-serif italic text-brand-teal font-normal underline decoration-brand-teal/20 underline-offset-8">Cabinet Vétérinaire</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-brand-slate text-lg lg:text-xl mb-10 leading-relaxed font-medium opacity-80 max-w-xl">
              L'adresse de référence pour le bien-être animal. 
              Une alliance unique entre <span className="text-brand-navy font-bold">expertise de pointe</span> et une approche profondément humaine.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 mb-12">
              {[
                { title: "Excellence Médicale", desc: "Soins spécialisés et chirurgie de pointe." },
                { title: "Animaux Exotiques", desc: "Expertise certifiée pour les Nouveaux Animaux de Compagnie (NAC)." },
                { title: "Transparence Totale", desc: "Une communication claire pour des choix sereins." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-brand-teal/30 flex items-center justify-center group-hover:bg-brand-teal group-hover:border-brand-teal transition-all flex-shrink-0">
                    <Check size={12} className="text-brand-teal group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors">{item.title}</h4>
                    <p className="text-sm text-brand-slate font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <button className="bg-brand-navy text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl hover:bg-brand-teal transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs">
                En savoir plus
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" />
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-bold text-brand-slate">
                  <span className="text-brand-navy font-black block">+2500 Clients</span> 
                  Satisfaits de nos services
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const FeaturesSection = () => {
  const features = [
    {
      title: "Médecine & Chirurgie",
      desc: "Consultations générales et spécialisées.",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800",
      icon: <Stethoscope className="text-white" size={32} />
    },
    {
      title: "Notre mission",
      desc: "L'excellence au service du bien-être.",
      img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
      icon: <PawPrint className="text-white" size={32} />
    },
    {
      title: "Imagerie Médicale",
      desc: "Plateau technique de dernière génération.",
      img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=800",
      icon: <HeartPulse className="text-white" size={32} />
    }
  ];

  return (
    <section className="bg-brand-teal-dark">
      <div className="grid md:grid-cols-3">
        {features.map((feature, idx) => (
          <div key={idx} className="relative group overflow-hidden h-[300px] md:h-[400px] lg:h-[450px]">
            <img src={feature.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={feature.title} />
            <div className="absolute inset-0 bg-brand-teal-dark/60 group-hover:bg-brand-teal-dark/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-extrabold mb-3 tracking-tight">{feature.title}</h3>
              <p className="opacity-80 text-lg max-w-[200px]">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Bar */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-12 flex flex-wrap justify-center gap-8 items-center text-white">
          <p className="w-full lg:w-auto text-center font-semibold text-lg opacity-90 mb-4 lg:mb-0">
            Besoin d'un renseignement ? Notre équipe est prête à vous aider.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center space-x-3 bg-brand-teal text-white px-8 py-4 rounded-xl hover:bg-white hover:text-brand-teal-dark transition-all font-bold shadow-lg">
              <MessageCircle size={20} />
              <span>WHATSAPP</span>
            </button>
            <button className="flex items-center space-x-3 border-2 border-white/20 px-8 py-4 rounded-xl hover:bg-white/10 transition-all font-bold">
              <Phone size={20} />
              <span>0522252472</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Consultation Générale",
      desc: "Examen complet pour évaluer la santé de votre animal et répondre à toutes vos inquiétudes.",
      icon: <Stethoscope className="text-brand-teal" size={28} />,
      category: "Soins"
    },
    {
      title: "Chirurgie Spécialisée",
      desc: "Interventions de pointe (tissus mous, orthopédie) avec monitoring constant.",
      icon: <Activity className="text-brand-teal" size={28} />,
      category: "Expertise"
    },
    {
      title: "Imagerie Médicale",
      desc: "Radiologie numérique haute définition et échographie pour diagnostics précis.",
      icon: <HeartPulse className="text-brand-teal" size={28} />,
      category: "Diagnostic"
    },
    {
      title: "Dentisterie",
      desc: "Détartrage et chirurgie buccale pour prévenir les maladies parodontales.",
      icon: <Activity className="text-brand-teal" size={28} />,
      category: "Soin buccal"
    },
    {
      title: "Laboratoire Interne",
      desc: "Analyses de sang et tests rapides pour des résultats en moins de 15 minutes.",
      icon: <Activity className="text-brand-teal" size={28} />,
      category: "Urgence"
    },
    {
      title: "Nutrition Spécifique",
      desc: "Conseils et alimentation thérapeutique adaptée à chaque pathologie.",
      icon: <PawPrint className="text-brand-teal" size={28} />,
      category: "Bien-être"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-brand-cream/50" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-brand-teal font-bold tracking-widest uppercase mb-3 text-[10px]">Excellence Médicale</p>
          <h2 className="text-4xl md:text-6xl text-brand-navy font-extrabold mb-4 tracking-tight">Nos Services <span className="font-serif italic text-brand-teal/40 block text-3xl mt-2 tracking-normal">Spécialisés</span></h2>
          <div className="h-1 w-20 bg-brand-teal mx-auto rounded-full opacity-30" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-brand-stone/50 group h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-brand-teal-light rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-teal transition-all duration-500">
                  <div className="text-brand-teal group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand-teal/40 uppercase tracking-widest pt-2">
                  {service.category}
                </span>
              </div>
              
                <div className="flex-1 flex flex-col pt-2">
                <h3 className="text-2xl mb-4 text-brand-navy font-black group-hover:text-brand-teal transition-colors leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="text-brand-slate mb-8 leading-relaxed text-sm font-medium opacity-80 flex-1 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </p>
                <div className="mt-auto overflow-hidden">
                  <a href="#" className="inline-flex items-center text-brand-navy font-bold hover:text-brand-teal transition-all group/link uppercase tracking-widest text-[11px] pb-1">
                   <span className="relative">
                      En Savoir Plus 
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-teal transition-all group-hover/link:w-full" />
                   </span>
                    <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-2 transition-transform opacity-60" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutMore = () => (
  <section className="flex flex-col lg:flex-row min-h-[600px] bg-brand-teal text-white overflow-hidden relative">
    {/* Paw Print Motif Background */}
    <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 4c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm16 0c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 22c5.5 0 10-4.5 10-10 0-3.3-2.7-6-6-6h-8c-3.3 0-6 2.7-6 6 0 5.5 4.5 10 10 10z' fill='%23ffffff'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}
    />
    <div className="lg:w-1/2 relative h-[300px] md:h-[450px] lg:h-auto">
      <img 
        src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=1200" 
        className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105" 
        alt="Veterinary Care" 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-20 h-20 bg-brand-teal/80 border-2 border-white/30 rounded-full flex items-center justify-center hover:scale-110 transition-transform backdrop-blur-sm shadow-2xl">
          <Activity size={32} />
        </button>
      </div>
    </div>
    <div className="lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
      <p className="font-bold tracking-widest uppercase mb-4 opacity-80 text-[10px] text-brand-teal-light">Faites Notre Connaissance</p>
      <h2 className="text-5xl md:text-6xl mb-8 leading-tight font-extrabold tracking-tight">À propos de nous <span className="font-serif italic text-brand-teal-light/60 block text-4xl mt-2">Quelques mots</span></h2>
      
      <p className="text-brand-teal-light mb-10 text-lg leading-relaxed font-medium opacity-90 italic font-serif">
        "Une professionnelle passionnée par les animaux. Notre vétérinaire certifiée met tout en œuvre pour offrir des soins de qualité à votre animal."
      </p>

      <div className="space-y-4">
        {[
          { title: "Expertise Inégalée", content: "13 ans d’expérience et des compétences pointues pour des diagnostics précis et des traitements efficaces." },
          { title: "Équipement Moderne", content: "Nous utilisons des technologies de pointe pour assurer le meilleur soin." },
          { title: "Compassion et Respect", content: "Chaque patient est traité comme un membre de la famille." }
        ].map((item, i) => (
          <details key={i} className="group border-b border-white/20 pb-4 cursor-pointer" open={i === 0}>
            <summary className="list-none flex justify-between items-center font-bold text-xl py-2 group-hover:text-brand-teal-light transition-colors">
              {item.title}
              <ChevronDown className="group-open:rotate-180 transition-transform text-brand-teal-light" size={24} />
            </summary>
            <p className="mt-4 text-brand-teal-light/90 leading-relaxed pl-4 border-l-2 border-brand-teal-light/30 text-sm">
              {item.content}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    {
      name: "Saara",
      role: "Propriétaire d'animaux",
      quote: "Le meilleure cabinet vétérinaire de la ville ! Notre équipe est juste merveilleuse avec nos petits compagnons. Elle prend tout son temps et son suivi est très personnalisé."
    },
    {
      name: "Ahmed",
      role: "Ami des chats",
      quote: "Une équipe professionnelle et à l'écoute. Les soins sont d'une grande qualité et on sent vraiment l'amour des animaux chez tout le personnel."
    }
  ];

  return (
    <section className="py-24 bg-brand-teal relative overflow-hidden">
      {/* Paw Print Motif Background */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 4c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm16 0c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm-8 22c5.5 0 10-4.5 10-10 0-3.3-2.7-6-6-6h-8c-3.3 0-6 2.7-6 6 0 5.5 4.5 10 10 10z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      {/* Polka Dot Patterns */}
      <div className="absolute top-10 left-10 text-white/5 grid grid-cols-10 gap-4">
        {[...Array(100)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-current" />)}
      </div>
      <div className="absolute bottom-10 right-10 text-white/5 grid grid-cols-10 gap-4">
        {[...Array(100)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-current" />)}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 text-white">
          <p className="font-bold tracking-widest uppercase mb-2 opacity-80 text-[10px]">Ce Que Disent Nos Clients</p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tight">Avis <span className="font-serif italic text-white/50 tracking-normal">Incroiyables</span></h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Image Mockup */}
          <div className="relative max-w-xs md:max-w-sm w-full">
            <div className="absolute inset-0 bg-brand-teal-dark rounded-3xl translate-x-4 translate-y-4 -z-10" />
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover" 
                alt="Golden Retriever at vet" 
              />
            </div>
          </div>

          <div className="max-w-2xl w-full bg-white p-12 md:p-20 rounded-[48px] shadow-2xl relative border border-brand-stone">
            <div className="absolute top-10 left-10 text-brand-teal-light">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 18V21C14.017 22.1046 14.9124 23 16.017 23H19.017C20.1216 23 21.017 22.1046 21.017 21V18C21.017 16.8954 20.1216 16 19.017 16H16.017C14.9124 16 14.017 16.8954 14.017 18ZM2 21L2 18C2 16.8954 2.89543 16 4 16H7C8.10457 16 9 16.8954 9 18V21C9 22.1046 8.10457 23 7 23H4C2.89543 23 2 22.1046 2 21ZM2 18V21C2 22.1046 2.89543 23 4 23H7C8.10457 23 9 22.1046 9 21V18C9 16.8954 8.10457 16 7 16H4C2.89543 16 2 16.8954 2 18Z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl text-brand-teal-dark font-serif italic mb-12 leading-relaxed">
                  "{reviews[active].quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-brand-teal-light rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-lg">
                    <PawPrint size={40} className="text-brand-teal" />
                  </div>
                  <h4 className="text-2xl font-bold text-brand-teal-dark">{reviews[active].name}</h4>
                  <p className="text-brand-teal font-semibold uppercase tracking-widest text-xs">{reviews[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            <div className="absolute top-1/2 -left-8 -right-8 flex justify-between transform -translate-y-1/2">
              <button 
                onClick={() => setActive(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
                className="w-16 h-16 bg-brand-teal-dark text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-brand-teal transition-all active:scale-95"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={() => setActive(prev => (prev === reviews.length - 1 ? 0 : prev + 1))}
                className="w-16 h-16 bg-brand-teal-dark text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-brand-teal transition-all active:scale-95"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-navy text-white pt-24 pb-12">
    <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-4 gap-12 border-b border-white/5 pb-20 mb-12">
      <div className="lg:col-span-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center shadow-lg">
            <PawPrint className="text-white" size={28} />
          </div>
          <div>
            <h4 className="text-xl font-bold tracking-tight leading-none uppercase">Cabinet Vétérinaire</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-teal mt-1">Clinique Vétérinaire</p>
          </div>
        </div>
        <p className="text-brand-stone/60 leading-relaxed mb-8 font-medium italic font-serif">
          "Notre clinique allie expertise médicale de pointe et approche humaine pour le bien-être de vos fidèles compagnons."
        </p>
        <div className="flex items-center space-x-4">
          <a href="#" className="w-12 h-12 border-2 border-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-teal hover:border-brand-teal transition-all duration-300"><Facebook size={20} /></a>
          <a href="#" className="w-12 h-12 border-2 border-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-teal hover:border-brand-teal transition-all duration-300"><Instagram size={20} /></a>
        </div>
      </div>

      <div>
        <h4 className="text-lg mb-8 font-bold text-white uppercase tracking-widest">Services</h4>
        <ul className="space-y-4 text-brand-stone/60 font-medium text-sm">
          <li><a href="#" className="hover:text-brand-teal transition-colors">Médecine Générale</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">Chirurgie Experte</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">Imagerie Numérique</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">Analyses Labo</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg mb-8 font-bold text-white uppercase tracking-widest">Navigation</h4>
        <ul className="space-y-4 text-brand-stone/60 font-medium text-sm">
          <li><a href="#" className="hover:text-brand-teal transition-colors">Accueil</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">L'Équipe</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">Plateau Technique</a></li>
          <li><a href="#" className="hover:text-brand-teal transition-colors">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg mb-8 font-bold text-white uppercase tracking-widest">Contact</h4>
        <ul className="space-y-5 text-brand-stone/60 font-medium text-sm">
          <li className="flex items-start gap-4">
            <MapPin className="text-brand-teal shrink-0" size={20} />
            <span className="text-sm">Votre Adresse, Casablanca, Maroc</span>
          </li>
          <li className="flex items-center gap-4">
            <Phone className="text-brand-teal shrink-0" size={20} />
            <span className="text-sm">+212 5 22 25 24 72</span>
          </li>
          <li className="flex items-center gap-4">
            <Mail className="text-brand-teal shrink-0" size={20} />
            <span className="text-sm">contact@votre-clinique.ma</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-brand-stone/40 text-[10px] font-bold uppercase tracking-widest">
      <p>© {new Date().getFullYear()} Cabinet Vétérinaire.</p>
      <div className="flex gap-8 mt-4 md:mt-0">
        <a href="#" className="hover:text-brand-teal transition-colors">Mentions Légales</a>
        <a href="#" className="hover:text-brand-teal transition-colors">Politique de Confidentialité</a>
      </div>
    </div>
  </footer>
);

const BeforeAfterGallery = () => {
  const cases = [
    {
      id: 1,
      name: "Tobby",
      treatment: "Dermatologie & Soin du pelage",
      before: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800",
      description: "Traitement intensif d'une allergie cutanée sévère. Grâce à un protocole personnalisé, Tobby a retrouvé un poil brillant, une vitalité exceptionnelle et une peau parfaitement saine."
    },
    {
      id: 2,
      name: "Luna",
      treatment: "Chirurgie Orthopédique",
      before: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
      description: "Après une rupture des ligaments croisés, Luna gambade à nouveau normalement grâce à une rééducation ciblée."
    },
    {
      id: 3,
      name: "Milo",
      treatment: "Transformation Nutritionnelle",
      before: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
      description: "Un régime personnalisé et un détartrage complet ont redonné à Milo toute son énergie de jeunesse."
    }
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-brand-cream/30" id="gallery">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-teal font-bold tracking-[0.3em] uppercase mb-4 text-[10px]">Preuves de notre expertise</p>
          <h2 className="text-5xl md:text-7xl text-brand-navy font-extrabold mb-6 tracking-tight">
            Métamorphoses <span className="font-serif italic text-brand-teal/50 tracking-normal">& Récits de succès</span>
          </h2>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto opacity-80 leading-relaxed font-medium italic font-serif">
            "Chaque patient est unique, chaque rétablissement est une victoire."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {cases.map((item, index) => (
            <motion.div 
              key={item.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-stone shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:shadow-brand-teal/20 border-8 border-white mb-10 transition-all duration-500">
                {/* Before Image (Base) */}
                <img src={item.before} alt="Avant" className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                
                {/* After Image (Slide reveal) */}
                <motion.div 
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  animate={{ 
                    clipPath: hoveredId === item.id ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' 
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={item.after} alt="Après" className="w-full h-full object-cover" />
                  <div className="absolute top-8 right-8 bg-brand-teal text-white text-[10px] font-black px-6 py-3 rounded-full shadow-2xl z-20 uppercase tracking-[0.2em] border border-white/30 backdrop-blur-md">
                    Après
                  </div>
                </motion.div>

                {/* Handle (Visual cue) */}
                <motion.div 
                  className="absolute inset-y-0 w-1 bg-white z-20"
                  animate={{ 
                    left: hoveredId === item.id ? '0%' : '100%' 
                  }}
                  initial={{ left: '100%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                   <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center text-brand-teal">
                      <ChevronLeft size={16} /><ChevronRight size={16} className="-ml-2" />
                   </div>
                </motion.div>

                {/* Labels and Hints */}
                <div className="absolute top-8 left-8 bg-brand-navy/40 backdrop-blur-md text-white text-[10px] font-black px-6 py-3 rounded-full shadow-xl z-0 uppercase tracking-[0.2em] border border-white/10">
                  Avant
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[2px] w-10 bg-brand-teal/30" />
                  <p className="text-[10px] text-brand-teal font-black uppercase tracking-widest">{item.treatment}</p>
                </div>
                <h3 className="text-3xl font-extrabold text-brand-navy mb-4 tracking-tight">{item.name}</h3>
                <p className="text-brand-slate text-base leading-relaxed opacity-70 italic font-serif">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-6 bg-white p-3 pr-10 rounded-full shadow-xl border border-brand-stone"
          >
            <div className="w-14 h-14 bg-brand-teal rounded-full flex items-center justify-center shadow-lg shadow-brand-teal/30">
              <Sparkles className="text-white" size={24} />
            </div>
            <div className="text-left font-serif">
              <p className="text-lg font-bold text-brand-navy leading-none mb-1">Votre animal peut être le prochain</p>
              <p className="text-xs text-brand-teal/60 font-medium">Prenez rendez-vous pour un bilan complet</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-16 lg:py-24 bg-white relative overflow-hidden" id="contact">
    <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-teal-light/20 -skew-x-12 transform translate-x-1/2 hidden lg:block" />
    
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <span className="text-brand-teal font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">On reste en contact ?</span>
          <h2 className="text-4xl md:text-6xl text-brand-navy font-extrabold mb-6 lg:mb-8 leading-tight tracking-tighter">
            Prendre <span className="text-brand-teal font-serif italic font-light">Rendez-vous</span>
          </h2>
          <p className="text-brand-slate text-lg mb-10 leading-relaxed max-w-md">
            Notre équipe dévouée est à votre écoute pour assurer le bien-être de votre compagnon.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-navy">Téléphone</h4>
                <p className="text-brand-slate font-medium underline decoration-brand-teal/30 decoration-2 underline-offset-4">+212 5 22 25 24 72</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-navy">Adresse</h4>
                <p className="text-brand-slate font-medium">Votre Adresse, Casablanca, Maroc</p>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-brand-stone relative"
        >
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-teal rounded-3xl -z-10 rotate-12" />
          <form className="space-y-4 lg:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-navy uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                <input type="text" className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all placeholder:text-brand-slate/40 text-sm" placeholder="Votre nom" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-navy uppercase tracking-[0.2em] ml-2">Email</label>
                <input type="email" className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all placeholder:text-brand-slate/40 text-sm" placeholder="votre@email.com" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-navy uppercase tracking-[0.2em] ml-2">Objet du RDV</label>
              <select className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all text-brand-slate text-sm">
                <option>Consultation générale</option>
                <option>Chirurgie Spécialisée</option>
                <option>Imagerie Médicale</option>
                <option>Urgence</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-navy uppercase tracking-[0.2em] ml-2">Message</label>
              <textarea className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all min-h-[100px] lg:min-h-[120px] placeholder:text-brand-slate/40 text-sm" placeholder="Message..."></textarea>
            </div>
            <button className="w-full bg-brand-navy hover:bg-brand-teal text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/10 uppercase tracking-[0.2em] text-xs">
              Confirmer la demande
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

const BottomCTA = ({ onOpenAppointment }: { onOpenAppointment?: () => void }) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-[90] lg:hidden flex gap-3 pointer-events-auto safe-bottom">
      <a 
        href="tel:+212522252472"
        className="flex-1 bg-brand-navy text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all"
      >
        <Phone size={16} />
        Appeler
      </a>
      <button 
        onClick={onOpenAppointment}
        className="flex-1 bg-brand-teal text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-[0_15px_30px_-5px_rgba(0,191,165,0.3)] font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all"
      >
        <Mail size={16} />
        RDV
      </button>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-lg rounded-[42px] shadow-2xl relative z-10 overflow-hidden border border-brand-stone"
          >
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-brand-navy tracking-tight leading-none">{title}</h3>
                  <div className="h-1 w-10 bg-brand-teal rounded-full opacity-30" />
                </div>
                <button 
                  onClick={onClose}
                  className="w-14 h-14 bg-brand-stone/50 hover:bg-red-50 hover:text-red-500 rounded-2xl flex items-center justify-center text-brand-navy transition-all duration-300 shadow-sm group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'appointment' | 'emergency' | 'subscription' | null>(null);

  const openAppointmentModal = () => {
    setModalType('appointment');
    setIsModalOpen(true);
  };

  const openEmergencyModal = () => {
    setModalType('emergency');
    setIsModalOpen(true);
  };

  const openSubscriptionModal = () => {
    setModalType('subscription');
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    
    // Auto-popup for subscription after 5 seconds
    const subTimer = setTimeout(() => {
      openSubscriptionModal();
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(subTimer);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative font-sans antialiased text-brand-navy selection:bg-brand-teal selection:text-white bg-white">
      <TopBar onOpenSubscription={openSubscriptionModal} />
      <Navbar onOpenAppointment={openAppointmentModal} onOpenEmergency={openEmergencyModal} />
      
      <main>
        <Hero onOpenAppointment={openAppointmentModal} />
        <AboutSection />
        <FeaturesSection />
        <ServicesGrid />
        <AboutMore />
        <BeforeAfterGallery />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />

      <Modal 
        isOpen={isModalOpen && modalType === 'appointment'} 
        onClose={closeModals} 
        title="Prendre RDV"
      >
        <div className="space-y-6">
          <p className="text-brand-slate font-medium">Réservez votre créneau en quelques secondes.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModals(); alert('Demande de RDV envoyée !'); }}>
            <input type="text" placeholder="Nom de l'animal" className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all placeholder:text-brand-slate/40 text-sm" required />
            <input type="tel" placeholder="Votre numéro de téléphone" className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all placeholder:text-brand-slate/40 text-sm" required />
            <select className="w-full bg-brand-stone/50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-brand-teal outline-none transition-all text-brand-slate text-sm">
                <option>Consultation (30 min)</option>
                <option>Vaccination</option>
                <option>Contrôle annuel</option>
            </select>
            <button className="w-full bg-brand-teal text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-brand-teal/20 uppercase tracking-[0.2em] text-xs">
              Envoyer la demande
            </button>
          </form>
        </div>
      </Modal>

      <Modal 
        isOpen={isModalOpen && modalType === 'emergency'} 
        onClose={closeModals} 
        title="Urgence Médicale"
      >
        <div className="space-y-8">
          <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex items-start gap-5">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#991b1b] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              <Phone size={24} className="relative z-10" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 mb-1">Ligne Directe Urgence</h4>
              <p className="text-red-700 font-bold text-2xl">+212 5 22 25 24 72</p>
              <p className="text-red-600/70 text-sm font-medium mt-2">Disponible pendant les heures d'ouverture pour les cas critiques.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-brand-navy flex items-center gap-2">
              <Activity size={18} className="text-red-500" />
              Signes d'alerte immédiate :
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {['Difficulté respiratoire', 'Hémorragie importante', 'Ingestion de poison', 'Inconscience', 'Convulsions'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-slate text-sm font-medium bg-brand-stone/40 p-3 rounded-xl border border-brand-stone">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={closeModals}
            className="w-full bg-brand-navy text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/10 uppercase tracking-[0.2em] text-xs"
          >
            Fermer
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={isModalOpen && modalType === 'subscription'} 
        onClose={closeModals} 
        title="Pass Santé Annuel"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-brand-teal to-brand-teal-dark rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-white/20 rounded-[28px] blur-xl animate-pulse" />
            <Sparkles className="text-white relative z-10" size={40} />
          </div>
          
          <h4 className="text-2xl font-black text-brand-navy mb-3 tracking-tight leading-none">
            Abonnement <span className="text-brand-teal italic font-serif">Privilège</span>
          </h4>
          
          <p className="text-brand-slate font-medium mb-8 text-base">
            Offrez une tranquillité d'esprit totale à votre compagnon pour seulement <span className="text-brand-navy font-black">1500 MAD / an</span>
          </p>

          <div className="grid gap-3 mb-10 text-left">
            {[
              "Consultations illimitées (Générale & NAC)",
              "Priorité absolue sur tous les rendez-vous",
              "Bilan biologique complet inclus 1x/an",
              "Support WhatsApp dédié 24h/24"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-brand-stone/40 rounded-2xl border border-white/50 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-8 h-8 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal transition-all">
                  <Check size={14} className="text-brand-teal group-hover:text-white" />
                </div>
                <span className="text-xs font-bold text-brand-navy/80">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => { closeModals(); alert('Merci de votre intérêt ! Notre équipe vous contactera pour finaliser votre adhésion.'); }}
              className="w-full bg-brand-navy text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-brand-teal transform hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]"
            >
              Devenir Membre Premium
            </button>
            <p className="text-[9px] text-brand-slate font-bold uppercase tracking-widest opacity-40">
              Engagement de 12 mois • Résiliable à tout moment
            </p>
          </div>
        </div>
      </Modal>

      {/* Floating Action Buttons for Desktop */}
      <div className="fixed bottom-8 right-8 z-[100] hidden lg:flex flex-col space-y-4">
        {/* Scroll Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-brand-teal text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-brand-teal-dark active:scale-95 transition-all"
            >
              <ArrowUp size={28} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Emergency Button */}
        <motion.button 
          onClick={openEmergencyModal}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="group relative w-16 h-16 bg-red-500 text-white rounded-[24px] flex items-center justify-center transition-all transform-gpu hover:scale-110 active:scale-95 active:translate-y-1 shadow-[0_12px_0_0_#991b1b,0_20px_40px_rgba(239,68,68,0.4)] hover:shadow-[0_14px_0_0_#991b1b,0_25px_50px_rgba(239,68,68,0.5)] active:shadow-[0_2px_0_0_#991b1b,0_5px_10px_rgba(239,68,68,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent rounded-[24px]" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl whitespace-nowrap pointer-events-none">
            Urgence 24h/7
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45" />
          </div>
          <Activity size={32} className="relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]" />
        </motion.button>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/212522252472?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20mon%20animal."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-16 h-16 bg-[#25D366] text-white rounded-[24px] flex items-center justify-center transition-all transform-gpu hover:scale-110 active:scale-95 shadow-[0_12px_0_0_#15803d,0_20px_40px_rgba(37,211,102,0.4)] hover:shadow-[0_14px_0_0_#15803d,0_25px_50px_rgba(37,211,102,0.5)] active:shadow-[0_2px_0_0_#15803d,0_5px_10px_rgba(37,211,102,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent rounded-[24px]" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl whitespace-nowrap pointer-events-none">
            Chat WhatsApp
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#25D366] rotate-45" />
          </div>
          <MessageCircle size={36} className="relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]" />
        </a>

      </div>

      <BottomCTA onOpenAppointment={openAppointmentModal} />
    </div>
  );
}

