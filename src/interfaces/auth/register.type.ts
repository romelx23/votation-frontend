export type IRoles = "ADMIN_ROLE" | "USER_ROLE" | "MONITOR_ROLE";

export interface ResponseRegister {
  ok: boolean;
  user: IUser;
  token: string;
}

export interface ResponseLogin {
  ok: boolean;
  user: IUser;
  token: string;
}

export interface ResponseRenew {
  ok: boolean;
  user: IUser;
  token: string;
}

export interface IUser {
  role: IRoles;
  status: boolean;
  google: boolean;
  name: string;
  email: string;
  uid: string;
}
