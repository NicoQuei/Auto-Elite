import { Car, Phone, Menu, X, Heart, Lock } from 'lucide-react';

export const Navbar = ({ currentView, handleViewChange, mobileMenuOpen, setMobileMenuOpen, favorites }) => (
  <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleViewChange('home')}>
        <div className="bg-blue-900 p-2 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
          <Car className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-900 tracking-tighter leading-none">AUTO<span className="text-orange-500">ELITE</span></h1>
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Premium Motors</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        {['home', 'stock', 'valuation', 'contact'].map((view) => (
          <button 
            key={view}
            onClick={() => handleViewChange(view)} 
            className={`relative py-2 transition-colors hover:text-blue-900 ${currentView === view ? 'text-blue-900 font-bold' : ''}`}
          >
            {view === 'home' ? 'Início' : view === 'stock' ? 'Estoque' : view === 'valuation' ? 'Vender' : 'Fale Conosco'}
            {currentView === view && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full"></span>}
          </button>
        ))}
        
        <button onClick={() => handleViewChange('favorites')} className="relative group">
           <Heart className={`w-6 h-6 ${currentView === 'favorites' ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-red-500'}`} />
           {favorites.length > 0 && (
             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
               {favorites.length}
             </span>
           )}
        </button>

        <button 
          onClick={() => handleViewChange('admin-login')} 
          className="text-gray-400 hover:text-blue-900 transition p-2"
          title="Área Administrativa"
        >
          <Lock size={20} />
        </button>

        <a href="https://wa.me/" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5">
          <Phone size={18} />
          <span className="font-bold">WhatsApp</span>
        </a>
      </div>

      <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-2xl absolute w-full animate-fade-in-down">
        <button onClick={() => handleViewChange('home')} className="text-left py-3 border-b border-gray-100 font-medium">Início</button>
        <button onClick={() => handleViewChange('stock')} className="text-left py-3 border-b border-gray-100 font-medium">Estoque Premium</button>
        <button onClick={() => handleViewChange('valuation')} className="text-left py-3 border-b border-gray-100 font-medium text-orange-500">Vender meu Carro</button>
        <button onClick={() => handleViewChange('favorites')} className="text-left py-3 border-b border-gray-100 font-medium flex justify-between">Meus Favoritos <Heart size={16}/></button>
        <button onClick={() => handleViewChange('contact')} className="text-left py-3 border-b border-gray-100 font-medium">Fale Conosco</button>
        
        <button onClick={() => handleViewChange('admin-login')} className="text-left py-3 border-b border-gray-100 font-medium text-gray-500 flex items-center gap-2">
           <Lock size={16} /> Área Administrativa
        </button>

        <button className="bg-green-500 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-bold">
          <Phone size={20} /> Falar com Consultor
        </button>
      </div>
    )}
  </nav>
);

