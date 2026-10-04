export interface OrderProductType {
  _id: string;
  title: string;
  imageCover: string;
  category?: { name: string };
}

export interface OrderItemType {
  _id: string;
  count: number;
  price: number;
  product: OrderProductType;
}

export interface ShippingAddressType {
  details: string;
  phone: string;
  city: string;
}

export interface OrderType {
  _id: string;
  id: number;
  cartItems: OrderItemType[];
  shippingAddress: ShippingAddressType;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: "cash" | "card";
  createdAt: string;
}