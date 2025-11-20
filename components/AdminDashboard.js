import { useState } from 'react';
import { Shield, LogOut, Plus, Star, Edit, Trash2, ChevronLeft, X, Upload, Sparkles, Loader, Save } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { Button } from '../utils/helpers';
import { callGeminiAPI } from '../config/gemini';

export const AdminDashboard = ({ cars, setCars, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const emptyCar = {
    id: null,
    make: '', model: '', category: 'Sedan', year: new Date().getFullYear(),
    price: '', km: '', fuel: 'Flex', transmission: 'Automático', 
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    description: '', featured: false
  };

  const requestDelete = (id) => {
    setCarToDelete(id);
  };

  const confirmDelete = () => {
    if (carToDelete) {
      setCars(prevCars => prevCars.filter(c => c.id !== carToDelete));
      setCarToDelete(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const carToSave = {
      ...currentCar,
      price: Number(currentCar.price),
      km: Number(currentCar.km),
      year: Number(currentCar.year)
    };

    if (currentCar.id) {
      setCars(prevCars => prevCars.map(c => c.id === currentCar.id ? carToSave : c));
    } else {
      setCars(prevCars => [...prevCars, { ...carToSave, id: Date.now() }]);
    }
    setIsEditing(false);
    setCurrentCar(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCar({ ...currentCar, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!currentCar.make || !currentCar.model) {
      alert("Por favor, preencha a Marca e o Modelo primeiro.");
      return;
    }
    
    setIsGeneratingDesc(true);
    const prompt = `
      Escreva uma descrição de venda curta, elegante e persuasiva para um carro usado com as seguintes características:
      Marca: ${currentCar.make}
      Modelo: ${currentCar.model}
      Ano: ${currentCar.year}
      Categoria: ${currentCar.category}
      
      O texto deve ser em Português de Portugal, focado em transmitir confiança, luxo e oportunidade única. Máximo de 250 caracteres. Não use hashtags.
      IMPORTANTE: Responda APENAS com texto simples. NÃO use formatação Markdown.
    `;

    try {
      const generatedText = await callGeminiAPI(prompt);
      setCurrentCar(prev => ({ ...prev, description: generatedText }));
    } catch (error) {
      console.error("Erro ao gerar descrição:", error);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-40">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield size={24} className="text-orange-500"/> Painel Administrativo
        </h2>
        <button onClick={onLogout} className="flex items-center gap-2 hover:text-orange-500 transition">
          <LogOut size={18} /> Sair
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Inventário de Veículos</h3>
                <p className="text-gray-500">Total de {cars.length} carros em stock</p>
              </div>
              <Button onClick={() => { setCurrentCar(emptyCar); setIsEditing(true); }}>
                <Plus size={20} /> Adicionar Veículo
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Veículo</th>
                      <th className="p-4">Preço</th>
                      <th className="p-4">Ano/KM</th>
                      <th className="p-4 text-center">Destaque</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cars.map(car => (
                      <tr key={car.id} className="hover:bg-gray-50 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img src={car.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div>
                            <p className="font-bold text-gray-900">{car.make} {car.model}</p>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{car.category}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-blue-900">{formatCurrency(car.price)}</td>
                        <td className="p-4 text-gray-500">{car.year} • {car.km.toLocaleString()}km</td>
                        <td className="p-4 text-center">
                          {car.featured ? <Star size={16} className="text-orange-500 fill-orange-500 mx-auto"/> : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setCurrentCar(car); setIsEditing(true); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"><Edit size={18}/></button>
                            <button onClick={() => requestDelete(car.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-blue-900" onClick={() => setIsEditing(false)}>
              <ChevronLeft size={20} /> Voltar para lista
            </div>
            
            {currentCar && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{currentCar.id ? 'Editar Veículo' : 'Novo Veículo'}</h3>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Marca</label>
                    <input required type="text" value={currentCar.make} onChange={e => setCurrentCar({...currentCar, make: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" placeholder="Ex: BMW" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Modelo</label>
                    <input required type="text" value={currentCar.model} onChange={e => setCurrentCar({...currentCar, model: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" placeholder="Ex: 320i" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                    <select value={currentCar.category} onChange={e => setCurrentCar({...currentCar, category: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none">
                      {['Sedan', 'SUV', 'Picape', 'Hatch', 'Coupe', 'Esportivo'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ano</label>
                    <input required type="number" value={currentCar.year} onChange={e => setCurrentCar({...currentCar, year: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preço (R$)</label>
                    <input required type="number" value={currentCar.price} onChange={e => setCurrentCar({...currentCar, price: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quilometragem</label>
                    <input required type="number" value={currentCar.km} onChange={e => setCurrentCar({...currentCar, km: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Combustível</label>
                    <input type="text" value={currentCar.fuel} onChange={e => setCurrentCar({...currentCar, fuel: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Câmbio</label>
                    <input type="text" value={currentCar.transmission} onChange={e => setCurrentCar({...currentCar, transmission: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Imagem do Veículo</label>
                  
                  {currentCar.image && (
                    <div className="mb-3 w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative group">
                      <img src={currentCar.image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setCurrentCar({...currentCar, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2 items-center">
                     <div className="flex-1">
                        <input 
                          type="text" 
                          value={currentCar.image} 
                          onChange={e => setCurrentCar({...currentCar, image: e.target.value})} 
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm" 
                          placeholder="Cole um URL https://..." 
                        />
                     </div>
                     
                     <span className="text-gray-400 text-sm font-medium">OU</span>

                     <div className="relative">
                        <input 
                          type="file" 
                          id="imageUpload" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                        <label 
                          htmlFor="imageUpload" 
                          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg cursor-pointer transition font-medium text-sm border border-gray-300"
                        >
                          <Upload size={18} /> Carregar Foto
                        </label>
                     </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Formatos aceites: JPG, PNG, WebP.</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">Descrição</label>
                    <Button 
                      variant="ai" 
                      type="button" 
                      onClick={handleGenerateDescription} 
                      disabled={isGeneratingDesc}
                      className="py-1 px-3 text-xs h-8"
                    >
                      {isGeneratingDesc ? <Loader size={14} className="animate-spin"/> : <Sparkles size={14}/>}
                      {isGeneratingDesc ? 'Gerando...' : 'Gerar com IA'}
                    </Button>
                  </div>
                  <textarea rows="4" value={currentCar.description} onChange={e => setCurrentCar({...currentCar, description: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none placeholder-gray-300" placeholder="Insira a descrição ou clique em 'Gerar com IA'..." />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={currentCar.featured} onChange={e => setCurrentCar({...currentCar, featured: e.target.checked})} className="w-5 h-5 text-blue-900 rounded focus:ring-blue-900" />
                  <label htmlFor="featured" className="text-gray-700 font-medium">Destacar na página inicial</label>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  <Button type="submit" className="flex items-center gap-2"><Save size={18}/> Salvar Veículo</Button>
                </div>
              </form>
            </div>
            )}
          </div>
        )}

        {carToDelete && (
           <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full animate-scale-up">
                 <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Trash2 className="text-red-600" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Remover Veículo?</h3>
                    <p className="text-gray-500 text-sm mt-2">Esta ação não pode ser desfeita. O veículo será removido permanentemente do inventário.</p>
                 </div>
                 <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setCarToDelete(null)} className="flex-1">Cancelar</Button>
                    <Button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-none border-transparent">Confirmar</Button>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

