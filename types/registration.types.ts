export type TFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TName = {
  firstName: string;
  lastName: string;
};

export type TUserCreationData = {
  name: TName;
  email: string;
  password: string;
};
