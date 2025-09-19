
export interface AddCartResponseI {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: Data<string>
}

export interface GetCartResponseI {
  message?: string
  status: string
  numOfCartItems: number
  cartId: string
  data: Data<Product2>
}

export interface Data<T> {
  _id: string
  cartOwner: string
  products: Product<T>[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product<T> {
  count: number
  _id: string
  product: T
  price: number
}

export interface Product2 {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}


