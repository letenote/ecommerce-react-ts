import { ProviderTypes } from "../../order-reducer/interface/Order";

export interface Payment {
  id: string,
  order_id: string,
  amount: number,
  provider: ProviderTypes
  status: string,
  created_at: Date,
  update_at: Date
};