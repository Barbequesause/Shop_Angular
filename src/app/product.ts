export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  //małe zdjęcie (lista i strona produktu)
  bigImage: string;
  //duże zdjęcie do zoomu
  rating: number;
  //ocena od 1 do 5
}
//tak wygląda jeden produkt

export interface CartItem {
  product: Product;
  quantity: number; //ile sztuk
}
//jedna pozycja w koszyku = produkt + ilość
