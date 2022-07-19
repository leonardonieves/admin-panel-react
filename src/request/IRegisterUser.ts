export interface IRegisterUser {
  fullName?: string;

  password?: string;

  confirmationPassword?: string;

  email: string | null;

  birthday: Date;

  phone: string;
}
