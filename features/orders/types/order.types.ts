export interface CustomerOrderItem {
  id: number;
  productId: number;
  name: string;
  slug: string;
  image: string | null;
  color: string | null;
  price: number;
  quantity: number;
  total: number;
}

export interface CustomerOrder {
  id: number;
  reference: string;
  status: string;
  statusLabel: string;
  paymentMethod: string;
  paymentMethodLabel: string;
  paymentStatus: string;
  paymentStatusLabel: string;
  cardBrand?: string | null;
  cardLast4?: string | null;
  currency: string;
  subtotal: number;
  shipping: number;
  total: number;
  itemsCount: number;
  items?: CustomerOrderItem[];
  placedAt: string;
  date: string;
}

export interface CustomerOrderDetail extends CustomerOrder {
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
  };
  summary: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  paidAt?: string;
  statusHistory: {
    id: number;
    fromStatus: string | null;
    toStatus: string;
    toStatusLabel: string;
    note: string | null;
    at: string;
  }[];
}
