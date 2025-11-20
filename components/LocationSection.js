import { MapPin, Phone, Calendar } from 'lucide-react';
import { Button } from '../utils/helpers';

export const LocationSection = () => (
  <div className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Onde Estamos</span>
        <h3 className="text-4xl font-bold text-blue-900 mt-2">Visite o Nosso Showroom</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-stretch bg-white p-4 rounded-2xl shadow-lg">
         <div className="w-full md:w-1/3 bg-blue-900 text-white p-10 rounded-xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-10 -translate-y-10"></div>
            <h4 className="text-2xl font-bold mb-8 relative z-10">AutoElite Motors</h4>
            <div className="space-y-8 relative z-10">
               <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg"><MapPin className="text-orange-500" size={20} /></div>
                  <div>
                     <p className="font-bold text-sm uppercase tracking-wide text-blue-200 mb-1">Endereço</p>
                     <p className="text-white font-medium leading-relaxed">Av. Beira Mar, 2600<br/>Meireles, Fortaleza - CE</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg"><Phone className="text-orange-500" size={20} /></div>
                  <div>
                     <p className="font-bold text-sm uppercase tracking-wide text-blue-200 mb-1">Contato</p>
                     <p className="text-white font-medium leading-relaxed">(85) 99999-0000<br/>vendas@autoelite.com.br</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-lg"><Calendar className="text-orange-500" size={20} /></div>
                  <div>
                     <p className="font-bold text-sm uppercase tracking-wide text-blue-200 mb-1">Horário</p>
                     <p className="text-white font-medium leading-relaxed">Seg - Sex: 09:00 - 19:00<br/>Sáb: 09:00 - 16:00</p>
                  </div>
               </div>
            </div>
            <Button variant="accent" className="mt-10 w-full relative z-10" onClick={() => window.open('https://maps.google.com', '_blank')}>Traçar Rota</Button>
         </div>
         <div className="w-full md:w-2/3 h-[450px] bg-gray-100 rounded-xl overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.354536738835!2d-38.49720748524098!3d-3.728822997303974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c748436865dc09%3A0x3a9e579216004865!2sAv.%20Beira%20Mar%2C%202600%20-%20Meireles%2C%20Fortaleza%20-%20CE%2C%2060165-121!5e0!3m2!1sen!2sbr!4v1623869675781!5m2!1sen!2sbr" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition duration-700"
              title="Mapa da Loja"
            ></iframe>
         </div>
      </div>
    </div>
  </div>
);

