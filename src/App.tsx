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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TopBar = () => (
  <div className="bg-brand-teal-dark text-white/90 py-2.5 px-4 md:px-8 hidden lg:flex justify-between items-center text-[11px] font-medium border-b border-white/10 uppercase tracking-widest">
    <div className="flex items-center space-x-10">
      <a 
        href="https://goo.gl/maps/XYZ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-white transition-colors"
      >
        <MapPin size={12} className="text-white" />
        <span>43 Rue Ahmed El Kadmiri, Maarif Casablanca</span>
      </a>
      <a 
        href="mailto:contact@vetvalfleuri.ma" 
        className="flex items-center space-x-2 hover:text-white transition-colors"
      >
        <Mail size={12} className="text-white" />
        <span>contact@vetvalfleuri.ma</span>
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
      <a href="#" className="hover:text-white transition-colors"><Facebook size={16} /></a>
      <a href="#" className="hover:text-white transition-colors"><Instagram size={16} /></a>
    </div>
  </div>
);

const Navbar = () => {
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
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-brand-teal z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
      />
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
              Val Fleuri
            </h1>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative font-bold text-[12px] uppercase tracking-wider hover:text-brand-teal transition-all flex items-center gap-1.5 ${isScrolled ? 'text-brand-navy' : 'text-white'} ${activeSection === link.id ? 'text-brand-teal' : ''}`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-teal rounded-full"
                />
              )}
            </a>
          ))}
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
                  className="flex justify-between items-center text-lg font-bold text-brand-navy p-4 bg-brand-stone/40 rounded-2xl hover:bg-brand-teal-light hover:text-brand-teal transition-all group"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                  <ArrowRight size={20} className="text-brand-teal/40 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
              
              <div className="pt-6 flex items-center justify-between border-t border-brand-stone/50 mt-4 px-2">
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-navy hover:bg-brand-teal hover:text-white transition-all"><Facebook size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-brand-stone rounded-2xl flex items-center justify-center text-brand-navy hover:bg-brand-teal hover:text-white transition-all"><Instagram size={20} /></a>
                </div>
                <a href="tel:+212522252472" className="flex items-center gap-3 bg-brand-teal text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-brand-teal/20">
                  <Phone size={18} />
                  <span>APPEL</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?auto=format&fit=crop&q=80&w=2000";

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

        <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full z-10 overflow-hidden">
          <div className="w-full h-full relative">
            <img 
              src={heroImage} 
              alt="Cabinet Vétérinaire Val Fleuri" 
              className="w-full h-full object-cover object-center lg:object-right-bottom scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradients for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/80 via-transparent to-brand-teal/20 lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/60 via-transparent to-transparent hidden lg:block" />
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
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-14 py-6 rounded-2xl font-black text-xs shadow-2xl hover:bg-white hover:text-brand-navy transition-all transform hover:-translate-y-1.5 uppercase tracking-widest text-center"
            >
              Prendre RDV
            </a>
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

const AboutSection = () => (
  <section className="py-16 lg:py-24 bg-white" id="about">
    <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative order-2 lg:order-1"
      >
        <div className="absolute -top-6 -left-6 text-brand-teal opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-current" />)}
          </div>
        </div>
        <div className="relative z-10 overflow-hidden aspect-square max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] mx-auto lg:mx-0 shadow-2xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-8 border-brand-stone/50 group">
          <img 
            src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200" 
            alt="Expert Vet Care Excellence" 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 text-brand-teal opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-current" />)}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="order-1 lg:order-2"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-brand-teal font-bold uppercase tracking-widest text-[10px] mb-4 block">Découvrez notre univers</span>
        <h2 className="text-3xl md:text-5xl mb-6 lg:mb-8 text-brand-navy leading-tight font-extrabold tracking-tight">
          Bienvenue au <span className="font-serif italic text-brand-teal">Cabinet Vétérinaire</span> Val Fleuri
        </h2>
        <p className="text-brand-slate text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed opacity-90">
          l'adresse préférée des amoureux des animaux au Maroc ! Située au cœur de Casablanca, 
          notre clinique vétérinaire allie expertise médicale, technologie de pointe et compassion pour 
          offrir à vos compagnons à quatre pattes des soins sur mesure.
        </p>

        <ul className="space-y-5 mb-10">
          {[
            "Soins vétérinaires complets et spécialisés.",
            "Expertise en animaux exotiques (NAC) et bien-être animal.",
            "Services pratiques et transparents."
          ].map((item, i) => (
            <li key={i} className="flex items-center space-x-4 group">
              <div className="text-brand-teal bg-brand-teal-light p-2 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle2 size={20} className="text-brand-teal" />
              </div>
              <span className="font-semibold text-brand-navy text-lg">{item}</span>
            </li>
          ))}
        </ul>

        <button className="bg-brand-teal-dark hover:bg-brand-teal text-white font-bold py-4 px-12 rounded-xl transition-all shadow-xl shadow-brand-teal-dark/10">
          DÉCOUVREZ PLUS
        </button>
      </motion.div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Médecine & Chirurgie",
      desc: "Consultations générales et spécialisées.",
      img: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800",
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
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
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
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl mb-4 text-brand-navy font-bold group-hover:text-brand-teal transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-brand-slate mb-8 leading-relaxed text-sm font-medium opacity-80 flex-1">
                  {service.desc}
                </p>
                <div className="mt-auto">
                  <a href="#" className="inline-flex items-center text-brand-navy font-bold hover:text-brand-teal transition-colors group/link uppercase tracking-widest text-[11px] border-b-2 border-brand-teal/10 pb-1">
                    En Savoir Plus 
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
      name: "Sabrina",
      role: "Maman de Rex",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      quote: "Le meilleure cabinet vétérinaire à Casablanca ! Dr Kenza est juste merveilleuse avec nos petits compagnons. Elle prend tout son temps et son suivi est très personnalisé."
    },
    {
      name: "Yassine",
      role: "Passionné de Félins",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
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
          <p className="font-bold tracking-widest uppercase mb-2 opacity-80 text-[10px]">Expériences Réelles</p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tight">Avis <span className="font-serif italic text-white/50 tracking-normal">Incroiyables</span></h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Image Mockup */}
          <div className="relative max-w-xs md:max-w-sm w-full">
            <div className="absolute inset-0 bg-brand-teal-dark rounded-3xl translate-x-4 translate-y-4 -z-10" />
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Vet Clinic Patient Care" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          <div className="max-w-2xl w-full bg-white p-12 md:p-20 rounded-[48px] shadow-2xl relative border border-brand-stone">
            <div className="absolute top-10 left-10 text-brand-teal-light opacity-20">
              <MessageCircle size={80} strokeWidth={1} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="mb-8 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-brand-teal">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-2xl md:text-3xl text-brand-teal-dark font-serif italic mb-12 leading-relaxed">
                  "{reviews[active].quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-brand-stone rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src={reviews[active].image} 
                      alt={reviews[active].name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-brand-teal-dark">{reviews[active].name}</h4>
                  <p className="text-brand-teal font-black uppercase tracking-[0.2em] text-[10px]">{reviews[active].role}</p>
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
            <h4 className="text-xl font-bold tracking-tight leading-none uppercase">Val Fleuri</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-teal mt-1">Clinique Vétérinaire</p>
          </div>
        </div>
        <p className="text-brand-stone/60 leading-relaxed mb-8 font-medium italic font-serif">
          "La Clinique Val Fleuri allie expertise médicale de pointe et approche humaine pour le bien-être de vos fidèles compagnons."
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
            <span className="text-sm">43 Rue Ahmed El Kadmiri, Maarif Casablanca</span>
          </li>
          <li className="flex items-center gap-4">
            <Phone className="text-brand-teal shrink-0" size={20} />
            <span className="text-sm">+212 5 22 25 24 72</span>
          </li>
          <li className="flex items-center gap-4">
            <Mail className="text-brand-teal shrink-0" size={20} />
            <span className="text-sm">contact@vetvalfleuri.ma</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-brand-stone/40 text-[10px] font-bold uppercase tracking-widest">
      <p>© {new Date().getFullYear()} Cabinet Vétérinaire Val Fleuri.</p>
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
      before: "https://images.unsplash.com/photo-1591768793355-74d75b0caec2?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80&w=800",
      description: "Traitement intensif d'une allergie cutanée sévère. Tobby a retrouvé un poil brillant et une peau saine."
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
          {cases.map((item) => (
            <motion.div 
              key={item.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-stone shadow-2xl border-8 border-white mb-10 group-hover:shadow-brand-teal/10 transition-shadow">
                {/* Before Image (Base) */}
                <img src={item.before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" />
                
                {/* After Image (Slide reveal) */}
                <motion.div 
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  animate={{ 
                    clipPath: hoveredId === item.id ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' 
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={item.after} alt="Après" className="w-full h-full object-cover" />
                  <div className="absolute top-8 right-8 bg-brand-teal text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl z-20 uppercase tracking-widest border border-white/20">
                    Après
                  </div>
                </motion.div>

                {/* Labels and Hints */}
                <div className="absolute top-8 left-8 bg-brand-navy/60 backdrop-blur-md text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl z-0 uppercase tracking-widest border border-white/10">
                  Avant
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                  <div className="bg-white/10 backdrop-blur-xl p-6 rounded-full border border-white/30 animate-pulse">
                    <MousePointer2 className="text-white" size={32} />
                  </div>
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
                <p className="text-brand-slate font-medium">43 Rue Ahmed El Kadmiri, Maarif Casablanca</p>
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

const BottomCTA = () => (
  <div className="fixed bottom-6 left-4 right-4 z-[90] lg:hidden flex gap-3 pointer-events-auto safe-bottom">
    <a 
      href="tel:+212522252472"
      className="flex-1 bg-brand-navy text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all"
    >
      <Phone size={16} />
      Appeler
    </a>
    <a 
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
      }}
      className="flex-1 bg-brand-teal text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-[0_15px_30px_-5px_rgba(0,191,165,0.3)] font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all"
    >
      <Mail size={16} />
      RDV
    </a>
  </div>
);

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative font-sans antialiased text-brand-navy selection:bg-brand-teal selection:text-white bg-white">
      <TopBar />
      <Navbar />
      
      <main>
        <Hero />
        <AboutSection />
        <FeaturesSection />
        <ServicesGrid />
        <AboutMore />
        <BeforeAfterGallery />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />

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

        {/* WhatsApp Button */}
        <button className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
          <MessageCircle size={36} />
        </button>

        {/* Accessibility Button */}
        <button className="w-14 h-14 bg-white text-brand-teal rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-brand-teal/20">
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center p-1 overflow-hidden">
            <div className="w-full h-full bg-current rounded-sm rotate-45" title="Accessibility icon" />
          </div>
        </button>
      </div>

      <BottomCTA />
    </div>
  );
}

