import { Product } from '../../products-reducer/interface/Product';

export interface userReducerInterface {
  name: string;
  isAuthentication: boolean;
  carts: Array<Product>
};