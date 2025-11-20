import { Gauge, Fuel, Heart, Scale, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export const CarCard = ({ car, isSelectedForCompare, onToggleCompare, favorites, toggleFavorite, setSelectedCar }) => (
  <div className={`bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border ${isSelectedForCompare ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100'} overflow-hidden group relative flex flex-col h-full`}>
    <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedCar(car)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img 
        src={car.image} 
        alt={`${car.make} ${car.model}`} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800'; }} 
      />
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <button 
          onClick={(e) => onToggleCompare(e, car.id)}
          className={`p-2 rounded-full shadow-md transition-all ${isSelectedForCompare ? 'bg-orange-500 text-white' : 'bg-white/90 text-gray-400 hover:text-orange-500'}`}
          title="Adicionar à Comparação"
        >
          <Scale size={18} />
        </button>
        <button 
          onClick={(e) => toggleFavorite(e, car.id)}
          className={`p-2 rounded-full shadow-md transition-all ${favorites.includes(car.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
        >
          <Heart size={18} className={favorites.includes(car.id) ? 'fill-current' : ''} />
        </button>
      </div>
      <div className="absolute bottom-3 left-3 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
        <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded uppercase">{car.category}</span>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-gray-500 font-bold tracking-wider uppercase">{car.make}</p>
          <h4 className="text-xl font-extrabold text-gray-800 group-hover:text-blue-900 transition-colors">{car.model}</h4>
        </div>
        <div className="bg-blue-50 text-blue-900 text-xs font-bold px-2 py-1 rounded border border-blue-100">
          {car.year}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 my-4 text-sm text-gray-600">
        <div className="flex items-center gap-2"><Gauge size={14} className="text-orange-500"/> {car.km.toLocaleString()} km</div>
        <div className="flex items-center gap-2"><Fuel size={14} className="text-orange-500"/> {car.fuel}</div>
        <div className="flex items-center gap-2 col-span-2"><div className="w-3.5 h-3.5 rounded border border-orange-500 flex items-center justify-center text-[8px] font-bold text-orange-500">A</div> {car.transmission}</div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Preço à vista</p>
          <span className="text-2xl font-bold text-blue-900">{formatCurrency(car.price)}</span>
        </div>
        <button 
          onClick={() => setSelectedCar(car)}
          className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </div>
);

