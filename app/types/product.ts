export type Product = {
  _id?: string;
  id: string;
  name: string;
  price: string;
  image: string;

  description: string;
  details: string;

  sizes: string[];
  sizeChart?: string;

  inStock: boolean;
  quantityAvailable: number;

  productCode: string;
  discount?: number;
};