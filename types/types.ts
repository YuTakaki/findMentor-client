export type userType = {
  username: string,
  email: string,
  id: string
}

export type authResponseType = {
  user : userType,
}

export type authSlicerStateType = {
  loading: boolean,
  user: userType | unknown,
  is_auth: null | boolean,
}