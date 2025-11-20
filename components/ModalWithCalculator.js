import { useState, useEffect } from 'react';
import { X, Gauge, Fuel, Calendar, ShieldCheck, Wrench, Calculator, Sparkles, Loader, Phone } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { Button } from '../utils/helpers';
import { callGeminiAPI } from '../config/gemini';

export const ModalWithCalculator = ({ selectedCar, setSelectedCar, handleViewChange }) => {
  const [downPayment, setDownPayment] = useState(selectedCar ? selectedCar.price * 0.3 : 0);
  const [months, setMonths] = useState(48);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    if(selectedCar) {
        setDownPayment(selectedCar.price * 0.3);
    }
    setAiAnalysis(null);
    setIsAnalyzing(false);
  }, [selectedCar]);

  if (!selectedCar) return null;

  // Cálculo simples de financiamento (Juros de 1.6% a.m. simulado)
  const interestRate = 0.016;
  const loanAmount = selectedCar.price - downPayment;
  const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -months));

  const handleAnalyzeCar = async () => {
    setIsAnalyzing(true);
    const prompt = `Analise o seguinte carro para um cliente em potencial:
    Marca: ${selectedCar.make}
    Modelo: ${selectedCar.model}
    Ano: ${selectedCar.year}
    Preço: ${formatCurrency(selectedCar.price)}
    KM: ${selectedCar.km}
    Detalhes: ${selectedCar.description}
    
    Crie um breve resumo de vendas (máximo 3 parágrafos) destacando os pontos fortes, o custo-benefício e por que este é um bom negócio. Use linguagem persuasiva em Português de Portugal.
    IMPORTANTE: Responda apenas com texto simples, sem formatação Markdown.`;
    
    const analysis = await callGeminiAPI(prompt);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative animate-scale-up shadow-2xl flex flex-col lg:flex-row">
        <button 
          onClick={() => setSelectedCar(null)}
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black transition z-50"
        >
          <X size={24} />
        </button>

        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
          <img 
            src={selectedCar.image} 
            alt={selectedCar.model} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800'; }} 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
             <h2 className="text-3xl font-bold text-white">{selectedCar.model}</h2>
             <p className="text-gray-300">{selectedCar.make} • {selectedCar.year}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 bg-white">
          <div className="flex justify-between items-center mb-6">
             <span className="text-3xl font-bold text-blue-900">{formatCurrency(selectedCar.price)}</span>
             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Em Estoque</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
             {[
               { icon: Gauge, label: 'Km', value: `${selectedCar.km.toLocaleString()} km` },
               { icon: Fuel, label: 'Combustível', value: selectedCar.fuel },
               { icon: Calendar, label: 'Ano', value: selectedCar.year },
               { icon: ShieldCheck, label: 'Garantia', value: 'Ativa' },
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <item.icon className="text-orange-500" size={20} />
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="mb-8">
             <div className="flex justify-between items-center mb-2">
               <h4 className="font-bold text-gray-900 flex items-center gap-2"><Wrench size={18} className="text-blue-900"/> Detalhes</h4>
               {!aiAnalysis && (
                 <Button variant="ai" onClick={handleAnalyzeCar} disabled={isAnalyzing} className="py-1 px-3 text-xs">
                   {isAnalyzing ? <Loader className="animate-spin" size={14}/> : <Sparkles size={14}/>}
                   {isAnalyzing ? 'Analisando...' : 'Análise IA'}
                 </Button>
               )}
             </div>
             
             <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedCar.description}</p>

             {aiAnalysis && (
               <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl animate-fade-in">
                 <h5 className="text-indigo-900 font-bold text-sm mb-2 flex items-center gap-2">
                   <Sparkles size={14} className="text-indigo-600"/> Análise Inteligente AutoElite
                 </h5>
                 <p className="text-indigo-800 text-xs leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
               </div>
             )}
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Calculator size={18}/> Simulação de Financiamento</h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                  Entrada <span>{formatCurrency(downPayment)}</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max={selectedCar.price * 0.8} 
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-900 mt-2"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Parcelas</label>
                <div className="flex gap-2">
                  {[12, 24, 36, 48, 60].map(m => (
                    <button 
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`flex-1 py-1 rounded text-sm font-bold transition ${months === m ? 'bg-blue-900 text-white' : 'bg-white border border-blue-200 text-blue-900'}`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200 flex justify-between items-end">
                <div className="text-xs text-gray-500">Valor Estimado da Parcela<br/><span className="text-[10px]">(Sujeito a análise)</span></div>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(monthlyPayment)}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { handleViewChange('contact'); setSelectedCar(null); }}>
               Tenho Interesse
            </Button>
            <a 
              href={`https://wa.me/?text=Olá, gostaria de saber mais sobre o ${selectedCar.model} de ${formatCurrency(selectedCar.price)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold hover:bg-green-600 transition"
            >
              <Phone size={18} className="mr-2"/> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

