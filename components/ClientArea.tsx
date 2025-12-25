
import React from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Tv, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  Key,
  Database,
  Hash,
  X,
  CreditCard,
  LifeBuoy,
  Users,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { ContentItem } from '../types';

interface ClientAreaProps {
  user: {
    id: string;
    name: string;
    email: string;
    plan: string;
    expiry: string;
    renewal_link?: string;
  };
  releases?: ContentItem[];
  onLogout: () => void;
  onClose: () => void;
}

const ClientArea: React.FC<ClientAreaProps> = ({ user, releases = [], onLogout, onClose }) => {
  
  const handleReferral = () => {
    const siteUrl = window.location.origin;
    const referralNumber = "5598982804577"; // Número solicitado pelo usuário
    const message = `Olá! Conheça o Guito Plus, a melhor plataforma de streaming. O ${user.name} me indicou e estou adorando! Teste agora em: ${siteUrl}`;
    const whatsappUrl = `https://wa.me/${referralNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renewalUrl = user.renewal_link || `https://wa.me/5598982804577?text=Olá! Gostaria de renovar meu acesso Guito Plus (ID: ${user.id}).`;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Dashboard Container */}
      <div className="relative w-full max-w-6xl h-full sm:h-[90vh] bg-[#0d0d0d] sm:bg-transparent sm:glass rounded-none sm:rounded-[2.5rem] border-0 sm:border border-white/10 overflow-hidden flex flex-col lg:flex-row animate-in fade-in zoom-in duration-500">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 bg-black/60 border-b lg:border-b-0 lg:border-r border-white/5 p-6 sm:p-8 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <User className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-sm sm:text-lg leading-none truncate max-w-[120px]">{user.name}</h2>
              <span className="text-[9px] text-red-500 uppercase tracking-widest font-black mt-1 block flex items-center gap-1">
                <Hash size={9} /> {user.id}
              </span>
            </div>
          </div>

          <nav className="hidden lg:block space-y-2 mt-10 w-full">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-600/20">
              <Tv size={20} /> Painel Geral
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
              <Database size={20} /> Minha Lista
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
              <Settings size={20} /> Configurações
            </button>
          </nav>

          <button 
            onClick={onLogout}
            className="lg:mt-auto flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl hover:bg-red-600/10 text-red-500 font-bold transition-all text-xs lg:text-base"
          >
            <LogOut size={18} className="lg:hidden" />
            <LogOut size={20} className="hidden lg:block" />
            <span className="hidden sm:inline">Sair da Conta</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-12 custom-scrollbar bg-[#0a0a0a]/50">
          <div className="flex justify-between items-start mb-8 sm:mb-12">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2 text-white">Olá, {user.name.split(' ')[0]}!</h1>
              <p className="text-xs sm:text-base text-gray-400">Gerencie sua assinatura e acesse seus dados.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Grid de Cards Superiores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Status Card com Renovação */}
            <div className="bg-gradient-to-br from-red-600/20 to-transparent p-5 sm:p-6 rounded-3xl border border-red-600/20 shadow-lg flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <ShieldCheck className="text-red-500" size={24} />
                <span className="bg-red-600 text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest text-white">Ativo</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Plano: {user.plan}</p>
              <h3 className="text-lg sm:text-xl font-black mb-1 text-white">Vence em {user.expiry}</h3>
              <div className="mt-auto pt-4">
                <a 
                  href={renewalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-center"
                >
                  <CreditCard size={14} /> Renovar Plano
                </a>
              </div>
            </div>

            {/* Indicar Amigo Card */}
            <div className="glass p-5 sm:p-6 rounded-3xl border border-white/5 flex flex-col group cursor-pointer hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Users className="text-blue-500" size={24} />
                <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest">+1 Mês Grátis</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Programa VIP</p>
              <h3 className="text-lg sm:text-xl font-black mb-1 text-white">Indique um Amigo</h3>
              <div className="mt-auto pt-4">
                <button 
                  onClick={handleReferral}
                  className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-blue-500/20"
                >
                  Enviar Indicação <ExternalLink size={12} />
                </button>
              </div>
            </div>

            {/* Suporte Rápido */}
            <div className="glass p-5 sm:p-6 rounded-3xl border border-white/5 flex flex-col group sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <LifeBuoy className="text-green-500" size={24} />
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Atendimento VIP</p>
              <h3 className="text-lg sm:text-xl font-black mb-1 text-white">Solicitar Suporte</h3>
              <div className="mt-auto pt-4">
                <a 
                  href="https://wa.me/5598982804577?text=Olá! Preciso de suporte com minha conta Guito Plus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600/10 hover:bg-green-600/20 text-green-500 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-green-600/20 text-center"
                >
                  Abrir WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Dados de Conexão - Layout Limpo */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 flex items-center gap-3 text-white">
              <Key className="text-red-600" size={18} /> Dados de Conexão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: 'ID de Usuário', value: user.id, icon: Hash },
                { label: 'Servidor', value: 'plus.guitoserve.tv', icon: Tv },
                { label: 'Data de Vencimento', value: user.expiry, icon: Calendar },
              ].map((data, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-white/10 transition-colors">
                  <div className="p-2 bg-white/5 rounded-lg text-red-500">
                    <data.icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">{data.label}</p>
                    <p className="font-mono text-xs text-white truncate">{data.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Novidades do Catálogo */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-black flex items-center gap-3 text-white">
                <Sparkles className="text-red-600" size={18} /> Novidades no Catálogo
              </h2>
              <button className="text-[9px] text-gray-500 hover:text-white uppercase font-black tracking-widest border border-white/5 px-3 py-1 rounded-full transition-all">Explorar Todos</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {releases.length > 0 ? (
                releases.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-40 sm:w-48 group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-xl border border-white/5 transition-transform duration-500 group-hover:scale-105">
                      <img src={item.image_url} className="object-cover w-full h-full" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2">
                         <div className="flex items-center gap-1 text-[8px] font-bold text-red-500 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded w-fit uppercase">
                           {item.category}
                         </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-[11px] sm:text-xs leading-tight text-white truncate px-1">{item.title}</h4>
                    <p className="text-[9px] text-gray-500 px-1">{item.year}</p>
                  </div>
                ))
              ) : (
                <div className="w-full py-10 text-center text-gray-500 text-sm">Nenhuma novidade encontrada.</div>
              )}
              
              {/* Botão Ver Mais no fim do scroll */}
              <div className="flex-shrink-0 w-40 sm:w-48 flex items-center justify-center">
                 <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-all group">
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
