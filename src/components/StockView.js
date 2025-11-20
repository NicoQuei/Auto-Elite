import { Search, Filter, Scale } from 'lucide-react';
import { CarCard } from './CarCard';
import { Button } from '../utils/helpers';
import { formatCurrency } from '../utils/helpers';

export const StockView = ({ cars, filters, setFilters, filteredCars, compareList, toggleCompare, setSelectedCar, favorites, toggleFavorite, setShowCompareModal, handleViewChange }) => {
  const categories = ['Todos', 'SUV', 'Sedan', 'Sedan Premium', 'SUV Premium', 'Picape'];
  const makes = ['Todos', ...new Set(cars.map(c => c.make))];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="bg-blue-900 py-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Nosso Estoque Premium</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Selecionamos minuciosamente cada veículo para garantir a máxima qualidade e satisfação.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Busca</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Modelo..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none text-sm font-medium"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>
            
            <div>
               <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Categoria</label>
               <select 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm text-gray-700 cursor-pointer"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
               >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>

            <div>
               <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Marca</label>
               <select 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm text-gray-700 cursor-pointer"
                  value={filters.make}
                  onChange={(e) => setFilters({...filters, make: e.target.value})}
               >
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
               </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Preço Máximo: {formatCurrency(filters.maxPrice)}</label>
              <input 
                type="range" 
                min="50000" 
                max="500000" 
                step="10000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900 mt-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
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
        {filteredCars.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <Filter className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">Nenhum veículo encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros para encontrar o carro ideal.</p>
            <Button variant="ghost" className="mt-4" onClick={() => setFilters({search: '', maxPrice: 500000, category: 'Todos', make: 'Todos'})}>Limpar Filtros</Button>
          </div>
        )}
      </div>

      {compareList.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-full px-6 py-3 border border-gray-200 z-40 animate-scale-up flex items-center gap-4">
           <div className="flex items-center gap-2">
              <Scale className="text-orange-500" size={20}/>
              <span className="font-bold text-gray-800 text-sm">{compareList.length} / 2 Veículos</span>
           </div>
           <div className="h-6 w-px bg-gray-200"></div>
           <button 
              onClick={() => toggleCompare({stopPropagation:()=>{}}, null)} 
              className="text-xs text-gray-500 hover:text-red-500 font-medium"
           >
             Limpar (Via Click Toggle)
           </button>
           <Button 
              onClick={() => setShowCompareModal(true)} 
              disabled={compareList.length < 2}
              className="py-2 px-4 text-xs h-auto"
              variant={compareList.length < 2 ? 'outline' : 'primary'}
           >
             Comparar
           </Button>
        </div>
      )}
    </div>
  );
};

