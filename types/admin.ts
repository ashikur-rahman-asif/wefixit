export interface OrderStats {
  total: number;
  today: number;
  thisMonth: number;
  byStatus: Record<string, number>;
}

export interface RevenueStats {
  currency: string;
  total: number;
  today: number;
  thisMonth: number;
}

export interface RepairStats {
  total: number;
  open: number;
  byStatus: Record<string, number>;
}

export interface CatalogStats {
  products: number;
  activeProducts: number;
  inactiveProducts: number;
  categories: number;
  brands: number;
  devices: number;
  colors: number;
}

export interface CustomersStats {
  total: number;
}

export interface ReviewsStats {
  total: number;
  averageRating: number;
}

export interface ContactMessagesStats {
  total: number;
  new: number;
}

export interface TopProduct {
  productId: number | null;
  slug: string;
  title: string;
  quantitySold: number;
  revenue: number;
}

export interface LowStockProduct {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  stock: number;
}

export interface SalesTrend {
  date: string;
  label: string;
  orders: number;
  revenue: number;
}

export interface RecentOrder {
  id: number;
  reference: string;
  customerName: string;
  email: string | null;
  paymentStatus: string;
  status: string;
  total: number;
  itemsCount: number;
  placedAt: string;
}

export interface DashboardStats {
  orders: OrderStats;
  revenue: RevenueStats;
  repairs: RepairStats;
  catalog: CatalogStats;
  customers: CustomersStats;
  reviews: ReviewsStats;
  contactMessages: ContactMessagesStats;
  lowStock: LowStockProduct[];
  topProducts: TopProduct[];
  salesTrend: SalesTrend[];
  recentOrders: RecentOrder[];
}

export interface DashboardResponse {
  status: string;
  message: string;
  data: DashboardStats;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: string;
  message: string;
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    lastPage: number;
    total: number;
    from: number | null;
    to: number | null;
  };
}

export interface OrderItem {
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

export interface OrderStatusHistory {
  id: number;
  fromStatus: string | null;
  toStatus: string;
  toStatusLabel: string;
  note: string | null;
  changedBy: string;
  changedById: number | null;
  at: string;
}

export interface AdminOrder extends RecentOrder {
  statusLabel: string;
  paymentMethod: string;
  paymentMethodLabel: string;
  paymentStatusLabel: string;
  cardBrand?: string | null;
  cardLast4?: string | null;
  currency: string;
  subtotal: number;
  shipping: number;
  items?: OrderItem[];
  date: string;
  phone: string | null;
  stockReservedAt: string | null;
}

export interface AdminOrderDetail extends AdminOrder {
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
  paidAt: string | null;
  statusHistory: OrderStatusHistory[];
}

export interface ProductGrade {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminRepair {
  id: number;
  reference: string;
  status: string;
  statusLabel: string;
  trackingStep: number;
  device: string;
  brand: string;
  issue: string;
  modelName: string;
  handoverMethod: string;
  handoverMethodLabel: string;
  total: number;
  createdAt: string;
  date: string;
  customerName: string;
  email: string;
  phone: string | null;
  scheduledDate: string | null;
  scheduledTime: string | null;
}

export interface RepairEvent {
  id: number;
  status: string;
  title: string;
  description: string | null;
  occurredAt: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface AdminRepairDetail extends AdminRepair {
  issueDescription: string | null;
  additionalComments: string | null;
  notes: string | null;
  partsCost: number | null;
  serviceCharge: number | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    location: string | null;
  };
  timeline: RepairEvent[];
}

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminBrand {
  id: number;
  name: string;
  slug: string;
  device_name: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminColor {
  id: number;
  name: string;
  hex: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminDevice {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
