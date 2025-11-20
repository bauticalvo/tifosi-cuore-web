// ==================== TIPOS BASE ====================

export interface ProductVariant {
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  stock: number;
  sku?: string;
}

export interface Season {
  from: number;
  to: number;
}

// ==================== TIPOS PRINCIPALES ====================

export interface Media {
  _id: string;
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
  folder?: string;
  created_at: string; // o Date si usas string dates
  updated_at: string;
}

export interface Color {
  _id: string;
  name: string;
  hex_code?: string;
  created_at: string;
  updated_at: string;
}

export interface Country {
  _id: string;
  name: string;
  code?: string; // Agregar si lo necesitas
  image: string | Media; // ID o objeto completo
  created_at: string;
  updated_at: string;
}

export interface League {
  _id: string;
  name: string;
  image: string | Media;
  country: string | Country; // ID o objeto completo
  created_at: string;
  updated_at: string;
}

export interface Team {
  _id: string;
  name: string;
  short_name: string;
  image: string | Media;
  league: string | League;
  founded?: number;
  stadium?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: 'camiseta' | 'short' | 'buzo';
  description?: string;
  price: number;
  discount?: number;
  discounted_price?: number; // Virtual field
  color: string[] | Color[]; // IDs o objetos completos
  images: string[] | Media[]; // IDs o objetos completos
  variants: ProductVariant[];
  is_featured: boolean;
  season: Season;
  team?: string | Team;
  league?: string | League;
  country?: string | Country;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

// ==================== TIPOS PARA FORMULARIOS ====================

export interface ProductFormData {
  name: string;
  slug?: string;
  category: 'camiseta' | 'short' | 'buzo';
  description?: string;
  price: number;
  discount?: number;
  color: string[]; // Solo IDs
  images: string[]; // Solo IDs
  variants: ProductVariant[];
  is_featured: boolean;
  season: Season;
  team?: string;
  league?: string;
  country?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
}

// ==================== TIPOS PARA FILTROS ====================

export interface ProductFilters {
  category?: 'camiseta' | 'short' | 'buzo';
  team?: string;
  league?: string;
  country?: string;
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
  size?: string[];
  season?: string;
  is_featured?: boolean;
  tags?: string[];
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'created_at' | 'updated_at';
  order: 'asc' | 'desc';
}

// ==================== TIPOS PARA RESPuestas API ====================

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ==================== UTILITY TYPES ====================

// Para componentes que pueden recibir IDs u objetos completos
export type MaybePopulated<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: string | T[P];
};

// Producto con relaciones populadas
export type PopulatedProduct = Omit<Product, 'color' | 'images' | 'team' | 'league' | 'country'> & {
  color: Color[];
  images: Media[];
  team?: Team;
  league?: League;
  country?: Country;
};

// Producto con solo IDs (para forms)
export type ProductWithIds = Omit<Product, 'color' | 'images' | 'team' | 'league' | 'country'> & {
  color: string[];
  images: string[];
  team?: string;
  league?: string;
  country?: string;
};