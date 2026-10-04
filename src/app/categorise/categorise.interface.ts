export interface CategoryeResponse {
  results: number
  metadata: Metadata
  data: CategoryeDataType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryeDataType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
