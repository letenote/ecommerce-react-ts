import { Product } from '../../products-reducer/interface/Product';

export interface userReducerInterface {
  isAuthentication: boolean;
  carts: Array<Product>
};