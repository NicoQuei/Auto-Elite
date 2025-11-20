import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';
import { Button } from '../utils/helpers';

export const HeroCarousel = ({ handleViewChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src={slide.image} 
            alt="Hero" 
            className="w-full h-full object-cover animate-scale-slow"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920'; }} 
          />
          
          <div className="absolute inset-0 z-20 flex items-center container mx-auto px-4">
            <div className={`max-w-2xl text-white transition-all duration-1000 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 inline-block mb-4 rounded uppercase tracking-widest">Premium Cars</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light border-l-4 border-orange-500 pl-4">
                {slide.subtitle}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="accent" onClick={() => handleViewChange('stock')}>
                  Ver Estoque Premium <ArrowRight size={20} />
                </Button>
                <Button variant="outline" onClick={() => handleViewChange('contact')}>
                  Agendar Visita
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button onClick={prevSlide} className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-sm border border-white/20 transition"><ChevronLeft size={24} /></button>
        <button onClick={nextSlide} className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-sm border border-white/20 transition"><ChevronRight size={24} /></button>
      </div>
    </div>
  );
};

