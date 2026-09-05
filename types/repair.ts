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
}

export interface Issue {
  id: string;
  title: string;
  icon?: string;
}
