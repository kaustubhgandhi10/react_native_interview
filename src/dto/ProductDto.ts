interface RatingDto {
  rate: number;
  count: number;
}
export interface ProductDto {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: RatingDto;
}
