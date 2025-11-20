import { useState } from 'react';
import { Car, Sparkles, Loader, Banknote } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { Button } from '../utils/helpers';
import { callGeminiAPI } from '../config/gemini';

export const ValuationView = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    km: '',
    condition: 'Bom'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleValuation = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    const prompt = `
      Aja como um especialista em avaliação de carros usados no mercado brasileiro (especificamente Nordeste/Fortaleza).
      Avalie o seguinte veículo:
      - Marca: ${formData.make}
      - Modelo: ${formData.model}
      - Ano: ${formData.year}
      - KM: ${formData.km}
      - Condição Geral: ${formData.condition}

      Forneça:
      1. Uma estimativa de preço de mercado (intervalo Min - Max em Reais).
      2. Um breve comentário sobre a liquidez e valorização deste modelo.
      
      Formate a resposta de forma clara e estruturada, usando emojis se apropriado. Responda em Português.
      IMPORTANTE: Responda APENAS com texto simples. NÃO utilize nenhuma formatação Markdown (negrito, itálico, cabeçalhos, etc.).
    `;

    try {
      const analysis = await callGeminiAPI(prompt);
      setResult(analysis);
    } catch (error) {
      setResult("Não foi possível realizar a avaliação no momento. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Vender meu Carro</span>
            <h2 className="text-4xl font-bold text-blue-900 mt-2">Avaliação Inteligente de Veículos</h2>
            <p className="text-gray-500 mt-4">Descubra o valor do seu carro em segundos com a nossa Inteligência Artificial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Car size={24} className="text-blue-900"/> Dados do Veículo</h3>
              <form onSubmit={handleValuation} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Marca</label>
                  <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ex: Honda" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Modelo</label>
                  <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ex: Civic Touring" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ano</label>
                    <input required type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">KM</label>
                    <input required type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ex: 45000" value={formData.km} onChange={e => setFormData({...formData, km: e.target.value})} />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Condição</label>
                   <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-900" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
                     <option value="Excelente">Excelente (Sem detalhes)</option>
                     <option value="Bom">Bom (Pequenos riscos)</option>
                     <option value="Razoável">Razoável (Precisa de reparos)</option>
                   </select>
                </div>
                
                <Button type="submit" variant="ai" className="w-full mt-4" disabled={isAnalyzing}>
                  {isAnalyzing ? <Loader className="animate-spin" /> : <Sparkles />} 
                  {isAnalyzing ? 'Analisando Mercado...' : 'Avaliar Agora'}
                </Button>
              </form>
            </div>

            <div className={`bg-gradient-to-br from-blue-900 to-indigo-900 p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-0'}`}>
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               
               {!result ? (
                 <div className="text-center relative z-10 opacity-70">
                    <Banknote size={64} className="mx-auto mb-4 text-white/50"/>
                    <h3 className="text-2xl font-bold mb-2">Quanto vale o seu carro?</h3>
                    <p className="text-blue-200">Preencha os dados ao lado para receber uma estimativa instantânea baseada em IA.</p>
                 </div>
               ) : (
                 <div className="relative z-10 animate-fade-in">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 mb-6">
                      <h4 className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2"><Sparkles size={14}/> Estimativa AutoElite</h4>
                      <div className="text-white text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {result}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-blue-200 mb-4">Gostou da avaliação? Agende uma vistoria presencial para concretizar a venda.</p>
                      <Button variant="accent" className="w-full" onClick={() => window.open(`https://wa.me/?text=Olá, fiz uma avaliação online do meu ${formData.make} ${formData.model} e gostaria de agendar uma vistoria.`, '_blank')}>
                        Agendar Vistoria
                      </Button>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

