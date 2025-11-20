import { Award, ThumbsUp, Clock } from 'lucide-react';

export const AboutSection = () => (
  <div id="about" className="py-20 bg-white border-b border-gray-100">
     <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="md:w-1/2">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Nossa História</span>
              <h3 className="text-4xl font-bold text-blue-900 mt-2 mb-6">Paixão por Automóveis desde 2005</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                 <p>A AutoElite Motors nasceu do sonho de redefinir o mercado de automóveis premium em Fortaleza. Com quase duas décadas de experiência, construímos uma reputação sólida baseada na transparência, integridade e na curadoria meticulosa do nosso stock.</p>
                 <p>Não vendemos apenas carros; realizamos sonhos. Cada veículo que entra no nosso showroom passa por uma inspeção rigorosa de 150 pontos para garantir que apenas a excelência chega até si.</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Award className="mx-auto text-orange-500 mb-2" size={24}/>
                    <span className="font-bold text-blue-900 block text-xl">18+</span>
                    <span className="text-xs text-gray-500">Anos de Mercado</span>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <ThumbsUp className="mx-auto text-orange-500 mb-2" size={24}/>
                    <span className="font-bold text-blue-900 block text-xl">98%</span>
                    <span className="text-xs text-gray-500">Clientes Satisfeitos</span>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="mx-auto text-orange-500 mb-2" size={24}/>
                    <span className="font-bold text-blue-900 block text-xl">24h</span>
                    <span className="text-xs text-gray-500">Suporte Online</span>
                 </div>
              </div>
           </div>
           <div className="md:w-1/2 h-[500px] relative">
              <div className="absolute inset-0 bg-blue-900 rounded-2xl transform rotate-3 opacity-10"></div>
              <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                 alt="Equipe AutoElite" 
                 className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10"
              />
           </div>
        </div>
     </div>
  </div>
);

