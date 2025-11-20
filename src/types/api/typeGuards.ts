import type { Product, Media, Team, League, Country, Color, PopulatedProduct } from './products';

// Type guards básicos
export const isMedia = (obj: any): obj is Media => {
  return obj && typeof obj === 'object' && 'public_id' in obj && 'url' in obj;
};

export const isColor = (obj: any): obj is Color => {
  return obj && typeof obj === 'object' && 'name' in obj;
};

export const isTeam = (obj: any): obj is Team => {
  return obj && typeof obj === 'object' && 'name' in obj && 'short_name' in obj;
};

export const isLeague = (obj: any): obj is League => {
  return obj && typeof obj === 'object' && 'name' in obj && 'country' in obj;
};

export const isCountry = (obj: any): obj is Country => {
  return obj && typeof obj === 'object' && 'name' in obj;
};

// Verificar si un producto tiene relaciones populadas
export const isPopulatedProduct = (product: Product): product is PopulatedProduct => {
  return (
    Array.isArray(product.color) &&
    product.color.length > 0 &&
    typeof product.color[0] !== 'string' &&
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    typeof product.images[0] !== 'string'
  );
};

// Helper para obtener la URL de la imagen sin importar si es ID u objeto
export const getImageUrl = (image: string | Media): string => {
  if (typeof image === 'string') return image;
  return image.secure_url || image.url;
};

// Helper para obtener el nombre sin importar si es ID u objeto
export const getTeamName = (team: string | Team): string => {
  if (typeof team === 'string') return team;
  return team.name;
};