import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../data/mockData';
import { Button } from '../utils/helpers';

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div id="faq" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="container mx-auto px-4 relative z-10">
         <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
               <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Dúvidas?</span>
               <h3 className="text-4xl font-bold mt-2 mb-6">Perguntas Frequentes</h3>
               <p className="text-blue-200 mb-8">Não encontrou o que procura? Entre em contacto direto com a nossa equipa de suporte.</p>
               <Button variant="accent" onClick={() => window.scrollTo(0,0)}>Falar com Especialista</Button>
            </div>
            <div className="md:w-2/3 space-y-4">
               {faqs.map((faq, idx) => (
                 <div key={idx} className="bg-blue-800/50 rounded-xl border border-blue-700 overflow-hidden">
                    <button 
                      className="w-full p-6 flex justify-between items-center text-left hover:bg-blue-800 transition"
                      onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    >
                      <span className="font-bold text-lg">{faq.question}</span>
                      {activeIndex === idx ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                    </button>
                    {activeIndex === idx && (
                      <div className="p-6 pt-0 text-blue-200 leading-relaxed animate-fade-in text-sm">
                         {faq.answer}
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

