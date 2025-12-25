
import { ContentItem, Plan } from './types';

// Updated RELEASES to use image_url and is_new to match the ContentItem interface
export const RELEASES: ContentItem[] = [
  { id: '1', title: 'A Jornada Galáctica', category: 'movie', image_url: 'https://picsum.photos/seed/movie1/400/600', rating: 9.2, year: '2024', is_new: true },
  { id: '2', title: 'Sombras da Cidade', category: 'series', image_url: 'https://picsum.photos/seed/series1/400/600', rating: 8.8, year: '2024', is_new: true },
  { id: '3', title: 'O Último Reino', category: 'movie', image_url: 'https://picsum.photos/seed/movie2/400/600', rating: 9.5, year: '2023', is_new: false },
  { id: '4', title: 'Cyberpunk 2099', category: 'series', image_url: 'https://picsum.photos/seed/series2/400/600', rating: 9.0, year: '2024', is_new: true },
];

// Updated CARTOONS to use image_url and add required is_new property
export const CARTOONS: ContentItem[] = [
  { id: 'c1', title: 'Aventuras na Selva', category: 'cartoon', image_url: 'https://picsum.photos/seed/cartoon1/400/600', rating: 8.5, year: '2024', is_new: false },
  { id: 'c2', title: 'Robôs no Espaço', category: 'cartoon', image_url: 'https://picsum.photos/seed/cartoon2/400/600', rating: 9.1, year: '2023', is_new: false },
  { id: 'c3', title: 'Escola de Magia', category: 'cartoon', image_url: 'https://picsum.photos/seed/cartoon3/400/600', rating: 8.9, year: '2024', is_new: false },
  { id: 'c4', title: 'Dinossauros Amigos', category: 'cartoon', image_url: 'https://picsum.photos/seed/cartoon4/400/600', rating: 8.2, year: '2022', is_new: false },
];

// Fixed missing checkout_url property for each Plan in the PLANS array
export const PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Básico',
    price: '29,90',
    features: ['1 Tela HD', 'Acesso a Filmes e Séries', 'Suporte 24h', 'Sem fidelidade'],
    is_recommended: false,
    checkout_url: 'https://checkout.guitoplus.com/basico',
    renewal_url: 'https://wa.me/5598982804577?text=Quero+renovar+meu+plano+Básico',
  },
  {
    id: 'p2',
    name: 'Premium',
    price: '49,90',
    features: ['2 Telas 4K Ultra HD', 'Canais de Esportes', 'Acesso VIP Lançamentos', 'Suporte Prioritário'],
    is_recommended: true,
    checkout_url: 'https://checkout.guitoplus.com/premium',
    renewal_url: 'https://wa.me/5598982804577?text=Quero+renovar+meu+plano+Premium',
  },
  {
    id: 'p3',
    name: 'Família',
    price: '79,90',
    features: ['4 Telas 4K simultâneas', 'Conteúdo Kids Completo', 'Gravador Digital', 'App para Smart TV'],
    is_recommended: false,
    checkout_url: 'https://checkout.guitoplus.com/familia',
    renewal_url: 'https://wa.me/5598982804577?text=Quero+renovar+meu+plano+Família',
  },
];
