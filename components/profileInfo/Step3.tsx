import { Box, Button, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../common/Formik/InputField'
import * as yup from 'yup'
import { StepPropType } from '../../types/types'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { addAdditionalInfoAction } from '../../store/actions/authActions'
import { useRouter } from 'next/router'

type payRateType = {
  pay_rate: number | ''
}
const Step3 = ({setActiveStepHandler} : StepPropType) => {
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const initialValues : payRateType= {
    pay_rate: user.pay_rate || ''
  }
  const validationSchema = yup.object({
    pay_rate : yup.number().required().min(1)
  })

  const submitHandler = async(values: payRateType) => {
    try {
      await dispatch(addAdditionalInfoAction(values))
      router.push('/mentor')
    } catch (error) {
      console.log(error);     
    }
  }
  return (
    <Box
      maxWidth={500}
      sx={{
        margin: 'auto'
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <Stack
            spacing={2}
          >
            <InputField name='pay_rate' label='Pay Rate' type='number'min={0}/>
            <Stack 
              spacing={2}
              direction='row'
              justifyContent='space-between'
            >
              <Button 
                type='button' 
                variant='contained'
                onClick={() => setActiveStepHandler(1)}
              >
                Back
              </Button>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Form>

      </Formik>
    </Box>
  )
}

export default Step3