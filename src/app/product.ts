export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  bigImage: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
