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
import { registerAction } from '../store/actions/authActions'
import { changeErrorAction } from '../store/slicers/authSlicers'
import { registerFormTypes } from '../types/types'


const FormContainer = styled('div')({
  margin: "auto",
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gridGap: 20,
  width: '100%',
  maxWidth: 400,
})

const Register : NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const account_type = router.query['account_type'];
  const initialValues : registerFormTypes = {
    username : '',
    password : '',
    email: '',
    first_name: '',
    last_name: '',
  }
  
  const validationSchema = yup.object({
    username : yup.string().required(),
    password: yup.string().required(),
    email : yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required()
  })
  
  useEffect(() => {
    if (router.isReady) {
      if (!account_type) {
        router.push('/');
      }
    };
  }, [account_type, router])

  const register = async(values : registerFormTypes, { setErrors } : FormikHelpers<registerFormTypes>) => {
    try {
      const data = {
        ...values,
        account_type
      };
      const register : any = await dispatch(registerAction(data));
      if ('error' in register) {
        setErrors(register.payload);
      } else {
        dispatch(changeErrorAction(0));
        router.push('/profile/info');
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
          onSubmit={register}
          validationSchema={validationSchema}
        >
          <Card 
            sx={{maxWidth: 400, margin: 'auto'}}
            elevation={10}
          >
            <Form>
              <FormContainer>
                <Typography
                  variant='h2'
                  fontSize={20}
                  align='center'
                  mb={1}
                >
                  Register
                </Typography>
                <InputField label="email" name="email"/>
                <InputField label="username" name="username"/>
                <InputField label="first name" name="first_name"/>
                <InputField label="last name" name="last_name"/>
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
                  Already have an account yet? <Link href={`/login?account_type=${account_type}`}>
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

export default Register;