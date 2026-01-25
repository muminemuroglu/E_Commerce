
export interface Product {
  companyId: any;
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number; // İndirimli fiyat varsa
  imageUrl: string;
  stock: number;
  categoryId: string;
  categoryName?: string;
  
  brandName?: string;
  isFreeShipping: boolean ;
  isFastDelivery: boolean ; // Öne çıkan ürün mü

}
