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
