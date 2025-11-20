import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '../utils/helpers';

export const ContactView = () => (
  <div className="pt-24 pb-16 min-h-screen bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-blue-900 text-white p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">Fale Conosco</h3>
            <p className="text-blue-200 mb-8 leading-relaxed">Visite nosso showroom ou entre em contato online. Seu próximo carro premium está esperando por você.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg"><MapPin className="w-6 h-6 text-orange-500" /></div>
                <div><h5 className="font-bold">Endereço</h5><p className="text-sm text-blue-100">Av. Beira Mar, 2600<br/>Meireles, Fortaleza - CE</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg"><Phone className="w-6 h-6 text-orange-500" /></div>
                <div><h5 className="font-bold">Atendimento</h5><p className="text-sm text-blue-100">(85) 99999-0000</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg"><Mail className="w-6 h-6 text-orange-500" /></div>
                <div><h5 className="font-bold">Email</h5><p className="text-sm text-blue-100">vendas@autoelite.com.br</p></div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex gap-4 relative z-10">
            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition border border-white/10"><Instagram size={20} /></a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition border border-white/10"><Facebook size={20} /></a>
          </div>
        </div>
        <div className="p-12 md:w-3/5">
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Envie uma mensagem</h4>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition" placeholder="Seu nome" />
              <input type="tel" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition" placeholder="Telefone" />
            </div>
            <input type="email" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition" placeholder="Email corporativo ou pessoal" />
            <textarea rows="4" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition" placeholder="Olá, tenho interesse no veículo..."></textarea>
            <Button type="submit" className="w-full">Enviar Solicitação</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

