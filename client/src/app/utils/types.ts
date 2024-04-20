export interface UserType {
  username: string;
  email: string;
  imgUrl: string;
}

export interface UserRegisterType extends UserType {
  password: string;
}
