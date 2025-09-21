export type UserType = 'farmer' | 'kitchen';

export interface FormData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  location: string;
  userType: UserType;
  whatsappOptIn: boolean;
  kitchenName: string;
  capacityPeople: number;
  storageCapacity: string;
  address: string;
}
