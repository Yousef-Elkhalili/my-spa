import { create } from "zustand";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  toggleLike: (id: string) => void;
  deleteProduct: (id: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    set((state) => {
      if (state.products.length === 0) {
        const fetchData = async () => {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          return data.map((product: Product) => ({ ...product, isLiked: false }));
        };
        fetchData().then((products) => set({ products }));
      }
      return state;
    });
  },
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  toggleLike: (id: string) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      ),
    })),
  deleteProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useProductStore;
