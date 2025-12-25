
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit2, 
  MessageSquare, 
  DollarSign, 
  X, 
  Loader2, 
  Save, 
  AlertTriangle, 
  Star, 
  Clapperboard, 
  CreditCard,
  Mail,
  Calendar,
  Phone,
  Clock,
  Link as LinkIcon,
  CheckCircle2,
  RefreshCcw,
  Sparkles,
  Zap,
  Hash,
  Server,
  ExternalLink
} from 'lucide-react';
import { supabase, isProduction } from '../supabaseClient';
import { ContentItem, Plan } from '../types';
import { RELEASES, CARTOONS, PLANS } from '../constants';

interface AdminDashboardProps {
  onClose: () => void;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  renewal_link: string;
  expiry: string;
  registration_date: string;
  server: string;
  app_name: string;
  created_at?: string;
}

const initialClientForm: ClientData = {
  id: '',
  name: '',
  email: '',
  renewal_link: '',
  expiry: '',
  registration_date: new Date().toLocaleDateString('pt-BR'),
  server: 'plus.guitoserve.tv',
  app_name: 'Guito Plus VIP'
};

const initialContentForm: Partial<ContentItem> = {
  title: '',
  category: 'movie',
  year: new Date().getFullYear().toString(),
  rating: 8.5,
  image_url: '',
  synopsis: '',
  movie_cast: [],
  is_new: true
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'leads' | 'clients' | 'plans'>('overview');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showClientModal, setShowClientModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [clientForm, setClientForm] = useState<ClientData>(initialClientForm);
  const [contentForm, setContentForm] = useState<Partial<ContentItem>>(initialContentForm);
  const [planForm, setPlanForm] = useState<Partial<Plan>>({});
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'client' | 'content' | 'lead' | 'plan' } | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      if (!isProduction) {
        setContent([...RELEASES, ...CARTOONS]);
        setPlans(PLANS);
        setClients([
          { id: '1234', name: 'Usuário Teste', email: 'teste@guitoplus.com', renewal_link: '', expiry: '30/12/2025', registration_date: '01/01/2024', server: 'plus.guitoserve.tv', app_name: 'Premium 4K' },
          { id: '882941', name: 'Maria Silva', email: 'maria@email.com', renewal_link: '', expiry: '15/11/2024', registration_date: '10/05/2024', server: 'plus.guitoserve.tv', app_name: 'Básico HD' }
        ]);
        setLeads([
          { id: 'l1', full_name: 'Carlos Alberto', email: 'carlos@email.com', phone: '98991223344', message: 'Gostaria de um teste grátis', created_at: new Date().toISOString() }
        ]);
        setLoading(false);
        return;
      }

      const [contentRes, leadsRes, clientsRes, plansRes] = await Promise.all([
        supabase.from('content').select().order('created_at', { ascending: false }),
        supabase.from('leads').select().order('created_at', { ascending: false }),
        supabase.from('clients').select().order('created_at', { ascending: false }),
        supabase.from('plans').select().order('price', { ascending: true })
      ]);
      
      setContent((contentRes.data as ContentItem[]) || []);
      setLeads(leadsRes.data || []);
      setClients((clientsRes.data as ClientData[]) || []);
      setPlans((plansRes.data as Plan[]) || []);
    } catch (error) {
      console.error("Erro ao carregar dados admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setClientForm(prev => ({ ...prev, id: randomId }));
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.id || !clientForm.name) {
      alert("Por favor, preencha o ID e o Nome do cliente.");
      return;
    }
    
    setIsSubmitting(true);

    if (!isProduction) {
      setTimeout(() => {
        if (isEditing) {
          setClients(prev => prev.map(c => c.id === clientForm.id ? clientForm : c));
        } else {
          setClients(prev => [clientForm, ...prev]);
        }
        setIsSubmitting(false);
        setShowClientModal(false);
      }, 500);
      return;
    }

    try {
      if (isEditing) {
        const { error } = await supabase.from('clients').update(clientForm).eq('id', clientForm.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('clients').insert([clientForm]);
        if (error) throw error;
      }
      await fetchAdminData();
      setShowClientModal(false);
    } catch (err: any) { 
      console.error(err); 
      alert("Erro ao salvar no banco de dados: " + err.message);
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);

    if (!isProduction) {
      if (itemToDelete.type === 'client') setClients(prev => prev.filter(c => c.id !== itemToDelete.id));
      if (itemToDelete.type === 'content') setContent(prev => prev.filter(c => c.id !== itemToDelete.id));
      if (itemToDelete.type === 'lead') setLeads(prev => prev.filter(l => l.id !== itemToDelete.id));
      if (itemToDelete.type === 'plan') setPlans(prev => prev.filter(p => p.id !== itemToDelete.id));
      setItemToDelete(null);
      setIsSubmitting(false);
      return;
    }

    try {
      const table = itemToDelete.type === 'client' ? 'clients' : itemToDelete.type === 'content' ? 'content' : itemToDelete.type === 'plan' ? 'plans' : 'leads';
      const { error } = await supabase.from(table).delete().eq('id', itemToDelete.id);
      if (error) throw error;
      await fetchAdminData();
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: 'Assinantes', value: clients.length.toString(), icon: Users, color: 'text-blue-500' },
    { label: 'Receita Est.', value: `R$ ${(clients.length * 35).toFixed(0)}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Títulos', value: content.length.toString(), icon: Clapperboard, color: 'text-red-600' },
    { label: 'Leads', value: leads.length.toString(), icon: MessageSquare, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-black border-r border-white/5 flex flex-col p-6 shrink-0 relative z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-red-600 p-2 rounded-xl">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none">GUITO ADMIN</h1>
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-[0.2em]">Master Control</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'clients', label: 'Assinantes', icon: Users },
            { id: 'content', label: 'Catálogo', icon: Film },
            { id: 'leads', label: 'Leads/Mensagens', icon: MessageSquare },
            { id: 'plans', label: 'Planos', icon: CreditCard },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button onClick={onClose} className="mt-6 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white transition-all font-bold text-sm bg-white/5 border border-white/5">
          <ArrowLeft size={18} /> Sair do Painel
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 custom-scrollbar">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {activeTab === 'overview' ? 'Visão Geral' : activeTab === 'clients' ? 'Assinantes' : activeTab === 'content' ? 'Catálogo' : activeTab === 'leads' ? 'Mensagens' : 'Planos'}
            </h2>
            <p className="text-gray-500">Administração Guito Plus v4.5</p>
          </div>
          <div className="flex items-center gap-4">
             {activeTab === 'clients' && (
               <button onClick={() => { setIsEditing(false); setClientForm(initialClientForm); setShowClientModal(true); }} className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 shadow-xl transition-all">
                 <Plus size={18} /> Novo Assinante
               </button>
             )}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                  <div className={`p-3 w-fit rounded-2xl bg-black border border-white/5 mb-4 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black">{stat.value}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">ID / Usuário</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Plano / App</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Vencimento</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
                             <Hash size={14} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{client.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono">{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-300 bg-white/5 px-2 py-1 rounded-md">{client.app_name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-red-500">{client.expiry}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                           <button onClick={() => { setClientForm(client); setIsEditing(true); setShowClientModal(true); }} className="p-2 hover:bg-blue-600/20 text-blue-500 rounded-lg transition-colors"><Edit2 size={16} /></button>
                           <button onClick={() => setItemToDelete({ id: client.id, type: 'client' })} className="p-2 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">Nenhum assinante cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal Cliente */}
      {showClientModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowClientModal(false)} />
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
              <Users className="text-red-600" /> {isEditing ? 'Editar Assinante' : 'Novo Assinante'}
            </h3>
            
            <form onSubmit={handleSaveClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-1">ID de Acesso</label>
                  <div className="flex gap-2">
                    <input 
                      required
                      type="text"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Ex: 123456"
                      value={clientForm.id}
                      onChange={(e) => setClientForm({...clientForm, id: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={handleGenerateId}
                      className="bg-red-600 hover:bg-red-700 p-3 rounded-xl text-white transition-colors"
                      title="Gerar ID Aleatório"
                    >
                      <Zap size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Nome Completo</label>
                  <input 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
                    placeholder="Nome do Cliente"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Vencimento (DD/MM/AAAA)</label>
                  <input 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
                    placeholder="Ex: 25/12/2024"
                    value={clientForm.expiry}
                    onChange={(e) => setClientForm({...clientForm, expiry: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-1">App / Plano</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none text-white"
                    value={clientForm.app_name}
                    onChange={(e) => setClientForm({...clientForm, app_name: e.target.value})}
                  >
                    <option value="Guito Plus VIP">Guito Plus VIP</option>
                    <option value="Básico HD">Básico HD</option>
                    <option value="Premium 4K">Premium 4K</option>
                    <option value="Kids & Família">Kids & Família</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Servidor</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
                  value={clientForm.server}
                  onChange={(e) => setClientForm({...clientForm, server: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Link de Renovação (Opcional)</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
                  placeholder="Link do checkout ou WhatsApp"
                  value={clientForm.renewal_link}
                  onChange={(e) => setClientForm({...clientForm, renewal_link: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowClientModal(false)} className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-4 rounded-2xl bg-red-600 hover:bg-red-700 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Salvar Cliente</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95" onClick={() => setItemToDelete(null)} />
          <div className="relative bg-[#111] p-8 rounded-[2rem] border border-white/10 max-w-sm w-full text-center">
             <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                <Trash2 size={32} />
             </div>
             <h4 className="text-xl font-bold mb-2">Excluir Item?</h4>
             <p className="text-gray-500 text-sm mb-8">Esta ação é irreversível e removerá todos os dados permanentemente.</p>
             <div className="flex gap-4">
                <button onClick={() => setItemToDelete(null)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-all">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold transition-all">Excluir</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
