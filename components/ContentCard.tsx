
import React from 'react';
import { Star, PlayCircle } from 'lucide-react';
import { ContentItem } from '../types';

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative flex-shrink-0 w-64 md:w-72 h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:z-10 shadow-2xl"
    >
      <img 
        src={item.image_url} 
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {item.is_new && (
        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
          Lançamento
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
          <span className="border border-gray-500 px-1 rounded uppercase">{item.category}</span>
          <span>•</span>
          <span>{item.year}</span>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight mb-2">{item.title}</h3>
        
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star size={14} fill="currentColor" />
            <span>{item.rating}</span>
          </div>
          <button className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md">
            <PlayCircle className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
