export interface Product {
  id: string;
  name: string;
  description: ProductDescription;
  price: number;
  category: ProductCategory,
  inventory: ProductInventory,
  images: ProductImages;
};

interface ProductImages {
  item: string,
  alt: string,
  detail: Array<string>
};

interface ProductDescription {
  preview: string
  highlight: Array<string>,
  details: string
};

interface ProductCategory {
  id: string,
  name: string,
  description: string,
  created_at: Date,
  update_at: Date,
  deleted_at: Date
};

interface ProductInventory {
  id: string,
  stock: number,
  sku: Array<SKU>,
  created_at: Date,
  update_at: Date,
  deleted_at: Date
};

interface SKU {
  size: ProductSkuSizeTypes,
  quantity: number,
  color: string,
  hexColor: string
}

export enum ProductSkuSize {
  s = "s",
  m = "m",
  l = "l",
  xl = "xl",
  xxl = "xxl",
  xxxl = "xxxl"
};

type ProductSkuSizeTypes = ProductSkuSize.s
  | ProductSkuSize.m
  | ProductSkuSize.l
  | ProductSkuSize.xl
  | ProductSkuSize.xxl
  | ProductSkuSize.xxxl