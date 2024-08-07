export type CartTypes = {
  id: string;
  products: ProductsTypes[];
  totalPrice: number;
};

export type ProductsTypes = {
  id: number;
  title: string;
  slug: string;
  description: string;
  live_link: string;
  support_for: string;
  price: number;
  subtitle: string;
  is_documented: false;
  total_sale: null;
};
