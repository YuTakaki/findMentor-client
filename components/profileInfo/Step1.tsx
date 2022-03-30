import React, { useRef, useState } from 'react'
import {  
  Stack,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik, FormikProps } from 'formik';
import InputField from '../common/Formik/InputField';
import * as yup from 'yup';
import { step1FormType, StepPropType } from '../../types/types';
import InputFile from '../common/Formik/InputFile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addAdditionalInfoAction } from '../../store/actions/authActions';
import { getImageUrl } from '../../utils/getImageUrl';

const useStyle =makeStyles({
  updateImageStack : {
    width: '100%',
    '@media(min-width: 600px)' : {
      width: '30%',
    }
  },

  infoForm : {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gridGap: 20,
    '@media(min-width: 600px)' : {
      width: '70%',
    }
  }
})

const Step1 = ({setActiveStepHandler} : StepPropType) => {
  const styles = useStyle();
  const formikRef = useRef<FormikProps<step1FormType>>(null);
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState<null | string>(null);
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const initialValues : step1FormType= {
    job_position: user.job_position || '',
    bio: user.bio || '',
    profile_img: user.profile_img || '',
  };

  const validationSchema = yup.object({
    job_position: yup.string().required(),
    bio: yup.string().required(),
    profile_mg: yup.mixed().required(),
  });

  const submitHandler = async(values : step1FormType) => {
    try {
      let check_result = false;
      for (let key in values) {
        if(values[key as keyof step1FormType] !== user[key]) {
          check_result = true;
        }
      }
      if (check_result === true) {
        await dispatch(addAdditionalInfoAction(values))
      }
      setActiveStepHandler(1);
    } catch (error) {
      console.log(error);     
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      innerRef={formikRef}
      render={({setFieldValue, values}) => (
        <Form onSubmit={(e) => {
          e.preventDefault();
          submitHandler(values);
        }}>
          <Stack 
            direction={{
              'xs' : 'column',
              'sm' : 'row'
            }}
            spacing={2}
            sx={{
              maxWidth : 900,
              margin: 'auto',
            }}
          >
            <Stack
              direction='column'
              className={styles.updateImageStack}
              alignItems='center'
              spacing={2}
            >
              <CardMedia
                component="img"
                image={getImageUrl(user, previewImg)}
                sx={{
                  borderRadius: 150,
                  height: 150,
                  width: 150,
                }}
              ></CardMedia>
              <InputFile label='' name='profile_img' setPreviewImg={setPreviewImg} setFieldValue={setFieldValue}/>
            </Stack>
            <Box
              className={styles.infoForm}
            >
              <InputField label='job position' name='job_position' />
              <InputField label='Bio' name='bio' multiline={true} minRows={8} />
  
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                sx={{
                  width: 'max-content',
                  marginLeft: 'auto'
                }}
              >
                Sumbit
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    >
    </Formik>
  )
}

export default Step1