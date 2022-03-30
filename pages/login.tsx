import { Button, Card, Container, Typography} from '@mui/material'
import { styled } from '@mui/styles'
import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import InputField from '../components/common/Formik/InputField'
import { loginAction } from '../store/actions/authActions'
import { loginFormTypes } from '../types/types'


const FormContainer = styled('div')({
  margin: "auto",
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gridGap: 20,
  width: '100%',
  maxWidth: 400,
});

const Login : NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    usernameOrEmail : '',
    password : '',
  }
  
  const validationSchema = yup.object({
    usernameOrEmail : yup.string().required(),
    password: yup.string().required()
  });

  
  
  const login = async(values : any, {setErrors}: FormikHelpers<loginFormTypes>) => {
    try {
      const login: any = await dispatch(loginAction(values));
      if ('error' in login) {
        setErrors(login.payload);
      } else {
        const user = login.payload.user
        router.push(`/${user.account_type}`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Container>
        <Link href="/">
          <a>
            <Typography
              align='center'
              fontSize={25}
            >
              Home
            </Typography>
          </a>
        </Link>
        <Formik
          initialValues={initialValues}
          onSubmit={login}
          validationSchema={validationSchema}
        >
          <Card 
            sx={{maxWidth: 400, margin: 'auto'}}
            elevation={2}
          >
            <Form>

              <FormContainer>
                <Typography
                  variant='h2'
                  fontSize={20}
                  align='center'
                  mb={1}
                >
                  Login
                </Typography>
                <InputField label="username or email" name="usernameOrEmail"/>
                <InputField label="password" name="password" type="password"/>
                <Button
                  variant="contained"
                  type='submit'
                >
                  Submit
                </Button>

                <hr />
                <Typography
                  textAlign='center'
                >
                  Already have an account yet?
                  <Link href='/type'>
                    <a style={{color: 'blue'}}>
                      register
                    </a>
                  </Link>
                  
                </Typography>
              </FormContainer>
            </Form>
          </Card>
        </Formik>
      </Container>
    </main>
  );
};

export default Login;