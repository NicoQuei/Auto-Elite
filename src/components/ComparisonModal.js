import { useState } from 'react';
import { X, Scale, Sparkles, Loader, Bot, Phone } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { Button } from '../utils/helpers';
import { callGeminiAPI } from '../config/gemini';

export const ComparisonModal = ({ carsToCompare, onClose }) => {
  const [comparisonResult, setComparisonResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    setIsComparing(true);
    const [car1, car2] = carsToCompare;
    
    const prompt = `
      Aja como um especialista automotivo imparcial. Compare os seguintes dois veículos para um potencial comprador:
      
      Veículo A: ${car1.make} ${car1.model} (${car1.year}) - ${formatCurrency(car1.price)} - ${car1.km}km
      Veículo B: ${car2.make} ${car2.model} (${car2.year}) - ${formatCurrency(car2.price)} - ${car2.km}km

      Crie uma comparação detalhada focando em:
      1. Custo-Benefício
      2. Conforto e Tecnologia (baseado no modelo geral)
      3. Desempenho e Consumo (baseado no modelo geral)
      
      No final, dê um "Veredito do Especialista" indicando qual é a melhor compra para diferentes perfis de condutor.
      Responda em Português de Portugal. Mantenha a resposta concisa e bem estruturada.
      IMPORTANTE: Responda APENAS com texto simples. NÃO utilize nenhuma formatação Markdown (negrito, itálico, tabelas, etc.). Use apenas quebras de linha e hífens para listas.
    `;

    try {
      const result = await callGeminiAPI(prompt);
      setComparisonResult(result);
    } catch (error) {
      setComparisonResult("Não foi possível gerar a comparação no momento.");
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative animate-scale-up shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
           <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-2"><Scale className="text-orange-500"/> Comparador Inteligente</h3>
           <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full transition"><X size={24}/></button>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             {carsToCompare.map((car, idx) => (
               <div key={car.id} className={`bg-gray-50 p-4 rounded-xl border-2 ${idx === 0 ? 'border-blue-100' : 'border-orange-100'}`}>
                  <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                     <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                     <span className={`absolute top-2 left-2 text-white px-3 py-1 rounded-full text-xs font-bold ${idx === 0 ? 'bg-blue-900' : 'bg-orange-500'}`}>Opção {idx + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{car.make} {car.model}</h4>
                  <p className="text-blue-900 font-bold text-lg mb-4">{formatCurrency(car.price)}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                     <div className="flex justify-between border-b border-gray-200 pb-1"><span>Ano:</span> <span className="font-semibold">{car.year}</span></div>
                     <div className="flex justify-between border-b border-gray-200 pb-1"><span>Km:</span> <span className="font-semibold">{car.km} km</span></div>
                     <div className="flex justify-between border-b border-gray-200 pb-1"><span>Combustível:</span> <span className="font-semibold">{car.fuel}</span></div>
                  </div>
               </div>
             ))}
          </div>

          {!comparisonResult && (
             <div className="text-center py-8">
                <Button variant="ai" onClick={handleCompare} disabled={isComparing} className="mx-auto text-lg px-8 py-4">
                   {isComparing ? <Loader className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
                   {isComparing ? 'A Analisar Veículos...' : 'Gerar Comparativo com IA'}
                </Button>
                <p className="text-gray-400 text-sm mt-4">A nossa IA analisará as especificações e valor de mercado de ambos os carros.</p>
             </div>
          )}

          {comparisonResult && (
             <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl animate-fade-in">
                <h4 className="text-indigo-900 font-bold text-lg mb-4 flex items-center gap-2"><Bot size={20}/> Análise Comparativa</h4>
                <div className="text-indigo-800 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                   {comparisonResult}
                </div>
                <div className="mt-6 text-center">
                   <Button onClick={() => window.open('https://wa.me/', '_blank')} className="bg-green-500 hover:bg-green-600 text-white border-none">
                      <Phone size={18} className="mr-2"/> Falar com Vendedor sobre estes Carros
                   </Button>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

