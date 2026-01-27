export interface ProductFilterParams {
  categoryId?: string;
  brandIds?: string[]; // Çoklu marka seçimi için dizi
  minPrice?: number;
  maxPrice?: number;
  keyword?: string;
  isFreeShipping?: boolean;
  isFastDelivery?: boolean;
  sortBy?: string;     // 'price_asc', 'price_desc', 'newest'
  pageNumber?: number;
  pageSize?: number;
}