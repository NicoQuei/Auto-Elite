import { Wrench, ShieldCheck, FileText, Users } from 'lucide-react';

export const ServicesSection = () => (
  <div id="services" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Nossos Serviços</span>
        <h3 className="text-4xl font-bold text-blue-900 mt-2">Experiência Completa AutoElite</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
           { icon: Wrench, title: "Oficina Premium", desc: "Mecânicos especializados em marcas de luxo e peças originais." },
           { icon: ShieldCheck, title: "Blindagem", desc: "Parceria com as melhores blindadoras com certificação nível III-A." },
           { icon: FileText, title: "Consultoria & Seguro", desc: "Assessoria completa para documentação e corretora de seguros exclusiva." },
           { icon: Users, title: "Importação Direta", desc: "Traga o carro dos seus sonhos sob encomenda com nossa assessoria." }
         ].map((service, idx) => (
           <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                 <service.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
           </div>
         ))}
      </div>
    </div>
  </div>
);

