export type userType = {
  id : string,
  username : string,
  first_name : string,
  last_name : string,
  email : string,
  account_type : string,
  job_position : string,
  pay_rate : string,
  bio : string,
  profile_img : string,
}
export type schedulesType = {
  id: number,
  startDate: Date | string,
  endDate: Date | string,
  title: string,
  note: string,
  rRule?: string,
  exDate?: string
}

export type appointmentType = {
  id: number,
  startDate: Date | string,
  endDate: Date | string,
  title: string,
  note: string,
  mentor: string,
  student: string,
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
  profile_img:  | File,
}

export type StepPropType = {
  setActiveStepHandler: Function
}
