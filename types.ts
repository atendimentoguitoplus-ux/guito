
export interface ContentItem {
  id: string;
  title: string;
  category: 'movie' | 'series' | 'cartoon';
  image_url: string;
  rating: number;
  year: string;
  is_new: boolean;
  created_at?: string;
  synopsis?: string;
  movie_cast?: string[]; // Renomeado para alinhar com o SQL
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  is_recommended: boolean;
  checkout_url: string;
  renewal_url: string; // Novo campo para link de renovação
  created_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
