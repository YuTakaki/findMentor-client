export type userType = {
  username: string,
  email: string,
  id: string
}

export type authResponseType = {
  user : userType,
  token : string,
  error : null | number
}

export type authSlicerStateType = {
  loading: boolean,
  user: userType | unknown,
  is_auth: null | boolean,
  error?: null | number
}

export type loginFormTypes = {
  usernameOrEmail: string,
  password: string
}

export type registerFormTypes = {
  username? : string,
  password? : string,
  email?: string,
  first_name?: string,
  last_name?: string,
  account_type? : string | string[] | undefined
}

export type step1FormType = {
  job_position : string,
  bio: string,
  profile_img: '' | File,
}