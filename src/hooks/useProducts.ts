import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/ProductApi";
import { ProductModel } from "../models/ProductModel";
import { mapProductDtoToModel } from "../mappers/ProductMapper";

export default function useProducts() {
  return useQuery<ProductModel[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetchProducts();
      return data.map(mapProductDtoToModel);
    },
  });
}
