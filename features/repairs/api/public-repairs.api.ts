import api from "@/lib/axios";

export interface SubmitRepairPayload {
  device: string;
  brand?: string;
  selectedIssue?: string;
  modelName: string;
  issueDescription: string;
  handoverMethod: string;
  selectedDate?: string;
  selectedTime?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  additionalComments?: string;
}

export const publicRepairsApi = {
  submitRepair: async (data: SubmitRepairPayload) => {
    const response = await api.post("/repairs", data);
    return response.data;
  },
  trackRepair: async (reference: string) => {
    const response = await api.get(`/repairs/track/${reference}`);
    return response.data;
  },
};

