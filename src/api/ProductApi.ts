import { ProductDto } from "../dto/ProductDto";
import { AppConstants } from "../common/AppConstants";

export const fetchProducts = async (): Promise<ProductDto[]> => {
  const response = await fetch(AppConstants.productApi);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
