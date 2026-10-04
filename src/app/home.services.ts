import { AllProductsResponse, Product } from "./home.interface";

export async function getAllProducts():Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
    
  );

  const data: AllProductsResponse = await res.json();
  return data.data;

}

