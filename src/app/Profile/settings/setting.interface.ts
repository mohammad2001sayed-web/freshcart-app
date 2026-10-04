export interface UpdateProfileDataType {
  name: string;
  email: string;
  phone: string;
}

export interface ChangePasswordDataType {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ActionResponse {
  message?: string;
  user?: any;
  [key: string]: any;
}
