import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

export const get = (url : string, headers={}) => {
  return api.get(url, headers)
}

export const post = (url : string, data : any = {}, headers={}) => {
  return api.post(url, data, headers)
}

export const put = (url : string, data: any = {}, headers={}) => {
  return api.put(url, data, headers)
}

export const remove = (url : string, headers={}) => {
  return api.delete(url, headers)
}