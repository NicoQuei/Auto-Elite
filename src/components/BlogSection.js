import { ChevronRight, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { Button } from '../utils/helpers';

export const BlogSection = () => (
  <div className="py-20 bg-white">
    <div className="container mx-auto px-4">
       <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Blog AutoElite</span>
            <h3 className="text-4xl font-bold text-blue-900 mt-2">Notícias Automóveis</h3>
          </div>
          <Button variant="ghost">Ver Blog Completo <ArrowRight size={18}/></Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="group cursor-pointer">
               <div className="rounded-xl overflow-hidden mb-4 relative h-56">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900">{post.date}</span>
               </div>
               <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-900 transition-colors">{post.title}</h4>
               <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
               <span className="text-orange-500 text-sm font-bold flex items-center gap-1">Ler Artigo <ChevronRight size={14}/></span>
            </div>
          ))}
       </div>
    </div>
  </div>
);

