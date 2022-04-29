import { Cart } from '../../cart-reducer/interface/Cart';

export interface userReducerInterface {
  name: string;
  isAuthentication: boolean;
  cart: Array<Cart>
};