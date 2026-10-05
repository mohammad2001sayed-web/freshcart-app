import { AllProductsResponse, Product } from "./home.interface";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
    {
      // Fail fast instead of hanging and taking down the whole build/request.
      signal: AbortSignal.timeout(15000), // 15s
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("getAllProducts failed:", res.status, res.statusText);
    return [];
  }

  const data: AllProductsResponse = await res.json();
  return data.data;
}