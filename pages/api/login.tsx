import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"

const { NEXT_PUBLIC_SERVER } = process.env;


export default async function handler(req : NextApiRequest, res: NextApiResponse){
  try {
    const data = req.body;
    const loginRequest = await axios.post(`${NEXT_PUBLIC_SERVER}/api/auth/login`, data);
    res.setHeader('Set-Cookie', serialize('token', loginRequest.data.token, {
      httpOnly: true,
      maxAge: 60 * 30,
      sameSite: 'strict',
      path: '/'
  }));
    res.send(loginRequest.data);
  } catch (error : any) {
    if (axios.isAxiosError(error)){
      res.status(error.response!.status).send(error.response?.data)
    }
  }

};