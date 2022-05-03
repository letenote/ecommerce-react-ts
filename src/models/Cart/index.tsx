export interface Cart {
  id: string,
  product_id: string,
  product_name: string,
  size: string,
  price: number,
  color: string,
  imageSrc: string,
  imageAlt: string,
  quantity: number,
  href: string,
  created_at?: Date,
  update_at?: Date
}