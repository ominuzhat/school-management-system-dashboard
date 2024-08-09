export type ProductDataTypes = {
  id: number;
  category: {
    id: number;
    name: string;
  };
  title: string;
  slug: string;
  description: string;
  price: number;
  live_link: string;
  support_for: string;
  is_documented: true;
  images: string[];
  tags: number[];
  total_sale: null;
};

export type TCreateProductTypes = {
  category: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  price: number;
  live_link: string;
  support_for: string;
  is_documented: boolean;
  images: string[];
};

// export type ProductsTypes = {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   live_link: string;
//   support_for: string;
//   price: number;
//   subtitle: string;
//   is_documented: false;
//   total_sale: null;
// };
