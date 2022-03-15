import { Button, Card, Container, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import InputField from '../components/common/Formik/InputField'

const useStyles = makeStyles((theme) => {
  return {
    form : {
      margin: "auto",
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gridGap: 20,
      width: '100%',
      maxWidth: 400,
    },
  
    register : {
      color: 'blue'
    }
  }
})
const Login : NextPage = () => {
  const styles = useStyles();
  const router = useRouter();
  const account_type = router.query['account_type'];
  const initialValues = {
    usernameOrEmail : '',
    password : '',
  }
  
  const validationSchema = yup.object({
    usernameOrEmail : yup.string().required(),
    password: yup.string().required()
  });

  
  useEffect(() => {
    if (router.isReady) {
      if (!account_type) {
        router.push('/');
      }
    };
  }, [account_type, router])
  
  
  const login = (values : any) => {
    console.log(values);
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
            <Form className={styles.form}>
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
                Already have an account yet? <Link href={`/register?account_type=${account_type}`}>
                  <a className={styles.register}>
                    register
                  </a>
                </Link>
                
              </Typography>
            </Form>
          </Card>

        </Formik>
      </Container>
    </main>
  );
};

export default Login;