import { BrandFilter } from "./brandFilter";
import { Product } from "./product";

export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  availableBrands: BrandFilter[];
  minPrice: number;
  maxPrice: number;
}