import { Heart } from 'lucide-react';
import { CarCard } from './CarCard';
import { Button } from '../utils/helpers';

export const FavoritesView = ({ cars, favorites, compareList, toggleCompare, setSelectedCar, toggleFavorite, handleViewChange }) => {
  const favCars = cars.filter(c => favorites.includes(c.id));
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" /> Meus Favoritos
        </h2>
        
        {favCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favCars.map(car => (
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
        ) : (
           <div className="text-center py-24 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Heart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Sua lista está vazia</h3>
              <p className="text-gray-500 mb-8">Adicione carros aos favoritos clicando no coração.</p>
              <Button onClick={() => handleViewChange('stock')}>Ver Estoque</Button>
           </div>
        )}
      </div>
    </div>
  );
};

