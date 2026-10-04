export interface AddressDataType {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressType extends AddressDataType {
  _id: string;
}

export interface AddressesResponse {
  status: string;
  message?: string;
  results?: number;
  data: AddressType[];
}

export interface SingleAddressResponse {
  status: string;
  message?: string;
  data?: AddressType;
}
