import { Model } from 'mongoose';
export type ProductCategory =
  | 'CPU'
  | 'Motherboard'
  | 'RAM'
  | 'Power Supply Unit'
  | 'Storage Device'
  | 'Monitor'
  | 'Others';

export type IProduct = {
  img: string;
  productName: string;
  category: ProductCategory;
  price: number;
  status: 'In Stock' | 'Out of stock';
  description: string;
  keyFeatures: string;
  individualRating: number;
  averageRating: number;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  maxPrice?: string;
  minPrice?: string;
  publishedYear?: number;
};

export type IProductFilterByPrice = {
  $gte?: number;
  $lte?: number;
};
