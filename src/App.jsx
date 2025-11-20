import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Lock, Mail, Instagram, Facebook } from 'lucide-react';

import { callGeminiAPI } from '../config/gemini';

import { initialCars } from '../data/mockData';

import { formatCurrency, Button } from '../utils/helpers';

import { Navbar } from '../components/Navbar';
import { HeroCarousel } from '../components/HeroCarousel';
import { CarCard } from '../components/CarCard';
import { StockView } from '../components/StockView';
import { FavoritesView } from '../components/FavoritesView';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { BlogSection } from '../components/BlogSection';
import { LocationSection } from '../components/LocationSection';
import { FAQSection } from '../components/FAQSection';
import { ModalWithCalculator } from '../components/ModalWithCalculator';
import { PrivacyPolicyView } from '../components/PrivacyPolicyView';
import { TermsOfUseView } from '../components/TermsOfUseView';
import { ComparisonModal } from '../components/ComparisonModal';
import { ValuationView } from '../components/ValuationView';
import { AdminLogin } from '../components/AdminLogin';
import { AdminDashboard } from '../components/AdminDashboard';
import { AIChatWidget } from '../components/AIChatWidget';
import { ContactView } from '../components/ContactView';

export default function AutoEliteApp() {
  const [currentView, setCurrentView] = useState('home'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState(initialCars);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    maxPrice: 500000,
    category: 'Todos',
    make: 'Todos'
  });
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    const results = cars.filter(car => {
      const matchesSearch = (car.make + ' ' + car.model).toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = car.price <= filters.maxPrice;
      const matchesCategory = filters.category === 'Todos' || car.category === filters.category;
      const matchesMake = filters.make === 'Todos' || car.make === filters.make;
      return matchesSearch && matchesPrice && matchesCategory && matchesMake;
    });
    setFilteredCars(results);
  }, [filters, cars]);

  const toggleFavorite = (e, carId) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const toggleCompare = (e, carId) => {
    e.stopPropagation();
    setCompareList(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
        if (prev.length >= 2) {
           alert("Pode comparar no máximo 2 veículos de cada vez.");
           return prev;
        }
        return [...prev, carId];
      }
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleViewChange = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    scrollToTop();
  };

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSubscribe = (e) => {
      e.preventDefault();
      if(email) {
         alert(`Obrigado! O email ${email} foi inscrito com sucesso na nossa newsletter.`);
         setEmail('');
      }
  };

  if (currentView === 'admin-login') {
    return <AdminLogin onLogin={() => { setIsAuthenticated(true); setCurrentView('admin-dashboard'); }} onCancel={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin-dashboard') {
    if (!isAuthenticated) {
      setTimeout(() => setCurrentView('admin-login'), 0);
      return null;
    }
    return <AdminDashboard cars={cars} setCars={setCars} onLogout={() => { setIsAuthenticated(false); setCurrentView('home'); }} />;
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-900">
      <Navbar 
        currentView={currentView} 
        handleViewChange={handleViewChange} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        favorites={favorites}
      />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroCarousel handleViewChange={handleViewChange} />
            
            <div className="container mx-auto px-4 -mt-10 relative z-30 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
                <div className="flex-1 w-full">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">O que você procura?</p>
                  <input type="text" placeholder="Ex: BMW 320i, SUV..." className="w-full text-lg font-bold outline-none text-gray-800 placeholder-gray-300" />
                </div>
                <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
                <div className="w-full md:w-auto">
                   <Button variant="primary" className="w-full md:w-auto" onClick={() => handleViewChange('stock')}>
                      <Search size={18} /> Buscar Veículos
                   </Button>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Showroom</span>
                    <h3 className="text-4xl font-bold text-blue-900 mt-2">Destaques Exclusivos</h3>
                  </div>
                  <button onClick={() => handleViewChange('stock')} className="text-gray-500 hover:text-blue-900 font-medium flex items-center gap-2 transition">Ver Tudo <ArrowRight size={18}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cars.filter(c => c.featured).slice(0,3).map(car => (
                    <CarCard 
                      key={car.id} 
                      car={car}
                      isSelectedForCompare={compareList.includes(car.id)}
                      onToggleCompare={toggleCompare} 
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      setSelectedCar={setSelectedCar}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <ServicesSection />

            <div className="bg-blue-900 py-20 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800/50">
                  {[
                    { number: '15+', label: 'Anos de Mercado' },
                    { number: '5k+', label: 'Carros Vendidos' },
                    { number: '100%', label: 'Aprovação' },
                    { number: '4.9', label: 'Avaliação Google' },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4">
                      <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{stat.number}</div>
                      <div className="text-blue-200 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AboutSection />
            <BlogSection />
            <LocationSection />
            <FAQSection />
          </>
        )}

        {currentView === 'stock' && (
          <StockView 
            cars={cars} 
            filters={filters} 
            setFilters={setFilters} 
            filteredCars={filteredCars} 
            compareList={compareList} 
            toggleCompare={toggleCompare} 
            setSelectedCar={setSelectedCar}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setShowCompareModal={setShowCompareModal}
            handleViewChange={handleViewChange}
          />
        )}
        {currentView === 'valuation' && <ValuationView />}
        {currentView === 'favorites' && (
          <FavoritesView 
             cars={cars} 
             favorites={favorites} 
             compareList={compareList} 
             toggleCompare={toggleCompare} 
             setSelectedCar={setSelectedCar} 
             toggleFavorite={toggleFavorite}
             handleViewChange={handleViewChange}
          />
        )}
        {currentView === 'privacy' && <PrivacyPolicyView />}
        {currentView === 'terms' && <TermsOfUseView />}
        
        {currentView === 'contact' && <ContactView />}
      </main>

      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
              <div className="lg:w-1/3">
                 <h3 className="text-2xl font-bold mb-4">AUTO<span className="text-orange-500">ELITE</span></h3>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Referência nacional em veículos premium e desportivos. A nossa missão é proporcionar a melhor experiência de compra, com transparência, segurança e qualidade ímpar.
                 </p>
                 <div className="flex gap-4">
                    <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition"><Instagram size={18}/></a>
                    <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition"><Facebook size={18}/></a>
                    <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition"><Mail size={18}/></a>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:w-2/3">
                 <div>
                    <h4 className="font-bold mb-4 text-white">Navegação</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                       <li><button onClick={() => handleViewChange('home')} className="hover:text-orange-500 transition">Início</button></li>
                       <li><button onClick={() => handleViewChange('stock')} className="hover:text-orange-500 transition">Estoque</button></li>
                       <li><button onClick={() => scrollToSection('services')} className="hover:text-orange-500 transition">Serviços</button></li>
                       <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition">Sobre Nós</button></li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold mb-4 text-white">Suporte</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                       <li><button onClick={() => scrollToSection('faq')} className="hover:text-orange-500 transition">FAQ</button></li>
                       <li><button onClick={() => handleViewChange('privacy')} className="hover:text-orange-500 transition text-left">Política de Privacidade</button></li>
                       <li><button onClick={() => handleViewChange('terms')} className="hover:text-orange-500 transition text-left">Termos de Uso</button></li>
                       <li><button onClick={() => handleViewChange('admin-login')} className="text-orange-500 hover:text-white transition font-bold flex items-center gap-1"><Lock size={12}/> Área Restrita</button></li>
                    </ul>
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <h4 className="font-bold mb-4 text-white">Newsletter</h4>
                    <p className="text-xs text-gray-500 mb-4">Receba ofertas exclusivas e novidades.</p>
                    <div className="flex">
                       <input 
                          type="email" 
                          placeholder="Seu email" 
                          className="bg-gray-800 text-white text-sm px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                       />
                       <button 
                          onClick={handleSubscribe}
                          className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-r-lg text-white font-bold transition"
                       >
                          OK
                       </button>
                    </div>
                 </div>
              </div>
           </div>
           <div className="text-center text-gray-600 text-xs border-t border-gray-800 pt-8">
             <p>&copy; 2024 AutoElite Motors. Todos os direitos reservados.</p>
           </div>
        </div>
      </footer>
      
      <ModalWithCalculator 
        selectedCar={selectedCar} 
        setSelectedCar={setSelectedCar} 
        handleViewChange={handleViewChange}
      />

      {showCompareModal && (
        <ComparisonModal 
          carsToCompare={cars.filter(c => compareList.includes(c.id))} 
          onClose={() => setShowCompareModal(false)} 
        />
      )}
      
      <AIChatWidget inventory={initialCars} />
    </div>
  );
}

