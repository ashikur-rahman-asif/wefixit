export interface Device {
  id: number | string;
  name: string;
  slug?: string;
  icon?: string;
}

export interface Brand {
  id: number | string;
  name: string;
  slug?: string;
  icon?: string;
  deviceName: string;
  deviceIds?: number[];
}

export interface Issue {
  id: string;
  title: string;
  icon?: string;
}

export interface RepairEvent {
  id: number;
  status: string;
  title: string;
  description: string;
  date: string;
  occurredAt: string;
}

export interface TrackRepairResponse {
  data: {
    id: number;
    reference: string;
    status: string;
    statusLabel: string;
    trackingStep: number;
    timeline: RepairEvent[];
  };
}

export interface CustomerRepair {
  id: number;
  reference: string;
  status: string;
  statusLabel: string;
  trackingStep: number;
  device: string;
  brand: string | null;
  issue: string | null;
  modelName: string;
  handoverMethod: string;
  handoverMethodLabel: string;
  total: number;
  createdAt: string;
  date: string;
}

export interface CustomerRepairDetail extends CustomerRepair {
  issueDescription: string | null;
  additionalComments: string | null;
  notes: string | null;
  partsCost: number | null;
  serviceCharge: number | null;
  scheduledDate: string | null;
  scheduledTime: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    location: string | null;
  };
  timeline: RepairEvent[];
}
