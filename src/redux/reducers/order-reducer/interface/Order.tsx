import { Cart } from "../../../../models/Cart"

export interface Order {
  id: string,
  user_id: string,
  items: Array<Cart>
  total: number,
  provider: ProviderTypes,
  created_at: Date,
  update_at: Date
}


enum Provider {
  jne, jnt, ninjaExpress
};

export type ProviderTypes = Provider.jne
  | Provider.jnt
  | Provider.ninjaExpress