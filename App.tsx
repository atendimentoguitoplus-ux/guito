
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentCard from './components/ContentCard';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ClientArea from './components/ClientArea';
import ContentDetailModal from './components/ContentDetailModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { supabase, isProduction } from './supabaseClient';
import { ContentItem, Plan } from './types';
import { RELEASES, CARTOONS, PLANS } from './constants';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState<any>(null);
  const [isClientAreaOpen, setIsClientAreaOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        if (!isProduction) {
          // Fallback imediato para modo demonstração
          setContent([...RELEASES, ...CARTOONS]);
          setPlans(PLANS);
          setLoading(false);
          return;
        }

        // Tentativa de buscar dados reais
        const [contentRes, plansRes] = await Promise.all([
          supabase.from('content').select('*').order('created_at', { ascending: false }),
          supabase.from('plans').select('*').order('price', { ascending: true })
        ]).catch(err => {
          console.error("Falha na conexão com Supabase:", err);
          return [{ data: null }, { data: null }];
        });

        // Lógica de prioridade: Banco de Dados > Mock Data
        const finalContent = (contentRes && contentRes.data && contentRes.data.length > 0) 
          ? contentRes.data as ContentItem[] 
          : [...RELEASES, ...CARTOONS];
          
        const finalPlans = (plansRes && plansRes.data && plansRes.data.length > 0)
          ? plansRes.data as Plan[]
          : PLANS;

        setContent(finalContent);
        setPlans(finalPlans);

      } catch (err) {
        console.error('Erro ao inicializar app:', err);
        setContent([...RELEASES, ...CARTOONS]);
        setPlans(PLANS);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const releases = content.filter(item => item.category !== 'cartoon');
  const cartoons = content.filter(item => item.category === 'cartoon');

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsClientAreaOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsClientAreaOpen(false);
  };

  const handleCardClick = (item: ContentItem) => {
    setSelectedContent(item);
  };

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={() => setIsAdminAuthenticated(true)} 
          onCancel={() => setIsAdminView(false)} 
        />
      );
    }
    return <AdminDashboard onClose={() => {
      setIsAdminView(false);
      setIsAdminAuthenticated(false);
    }} />;
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0a] selection:bg-red-600 selection:text-white ${(isClientAreaOpen || selectedContent) ? 'overflow-hidden' : ''}`}>
      <Navbar 
        isLoggedIn={!!user} 
        onOpenClientArea={() => setIsClientAreaOpen(true)}
        onLogin={handleLogin}
      />
      
      <main>
        <Hero />

        {/* Filmes e Séries Section */}
        <section id="releases" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12">
              <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-2">Streaming Ilimitado</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">Filmes e Séries</h3>
            </div>

            {loading ? (
              <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-64 md:w-72 h-[350px] md:h-[400px] bg-white/5 rounded-2xl animate-pulse flex items-center justify-center">
                    <Loader2 className="animate-spin text-white/10" size={32} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x hide-scrollbar scroll-smooth">
                {releases.length > 0 ? releases.map((item) => (
                  <div key={item.id} className="snap-start">
                    <ContentCard item={item} onClick={handleCardClick} />
                  </div>
                )) : (
                  <div className="text-gray-600 italic py-10">Carregando catálogo...</div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Mundo Kids Section */}
        <section id="cartoons" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12">
              <h2 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-2">Para os Pequenos</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">Mundo Kids</h3>
            </div>

            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x hide-scrollbar scroll-smooth">
              {cartoons.length > 0 ? cartoons.map((cartoon) => (
                <div key={cartoon.id} className="snap-start">
                  <ContentCard item={cartoon} onClick={handleCardClick} />
                </div>
              )) : (
                <div className="text-gray-600 italic py-10">Nenhum desenho disponível.</div>
              )}
            </div>
          </div>
        </section>

        <PricingSection plans={plans} loading={loading} />
        <ContactSection />
      </main>

      <Footer onAdminClick={() => setIsAdminView(true)} />

      {isClientAreaOpen && user && (
        <ClientArea 
          user={user} 
          releases={releases}
          onLogout={handleLogout} 
          onClose={() => setIsClientAreaOpen(false)} 
        />
      )}

      {selectedContent && (
        <ContentDetailModal 
          item={selectedContent} 
          onClose={() => setSelectedContent(null)} 
        />
      )}
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
