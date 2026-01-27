export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  isFreeShipping: boolean;
  isFastDelivery: boolean;
  imageUrl: string;
  stock: number;
  categoryId: string;
  companyId: string;
  categoryName?: string;
  brandName?: string;
}
