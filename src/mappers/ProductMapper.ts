import { ProductDto } from "../dto/ProductDto";
import { ProductModel } from "../models/ProductModel";

export function mapProductDtoToModel(product: ProductDto): ProductModel {
  return {
    id: product.id,
    productName: product.title,
    price: product.price,
    image: product.image,
    rating: product.rating.rate,
    category: product.category,
    description: product.description,
  };
}
