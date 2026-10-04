export interface AllBrandsResponse {
  results: number;
  metadata: Metadata;
  data: BrandDaum[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface BrandDaum {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
