export type Product = {
  _id?: string;
  id: string;
  name: string;
  price: number;
  image: string;

  description: string;
  details: string;

  sizes: string[];
  sizeChart?: string;

  inStock: boolean;
  quantityAvailable: number;

  productCode: string;
  discount?: number;
  featured: boolean;
};