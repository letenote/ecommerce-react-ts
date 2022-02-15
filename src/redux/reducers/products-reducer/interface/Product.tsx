export interface Product {
  id: string;
  name: string;
  qty: number;
  price: number;
  imageUrl: string;
  color: Array<string>;
  size: Array<string>;
  desc: string;
  stock: string;
};