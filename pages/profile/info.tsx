import React from 'react'
import { 
  Container,  
  Step, 
  StepLabel, 
  Stack,
  TextField,
  CardMedia,
  Button,
 } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/material/node_modules/@mui/system';
import { makeStyles } from '@mui/styles';
import MentorLayout from '../../components/layout/MentorLayout';


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
const Info = ({...props}) => {
  const steps = ['User Information', 'Programming languages', 'Pay Rate'];
  const styles = useStyle();


  return (
    <MentorLayout {...props}>
      <Container
        sx={{
          padding: 4
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            margin: 'auto',
            marginBottom: 10
          }}
        >
          <Stepper
            activeStep={2}
          >
            {steps.map((step, i) => (
              <Step sx={{'& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary',
              }}} key={step} completed={i < 2 && true}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}

          </Stepper>
        </Box>
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
              image='/images/dummy1.jpg'
              sx={{
                borderRadius: 150,
                height: 150,
                width: 150,
              }}
            >

            </CardMedia>
            <label htmlFor='file'>
              <Button
                variant='contained'
                color='secondary'
              >
                Upload Image
              </Button>

            </label>
            <input type='file' id='file' hidden />
          </Stack>
          <Box
            component="form"
            className={styles.infoForm}
          >
            <TextField 
              label='job position'
            />
            <TextField
              multiline
              label='Bio'
              minRows={8}
            />

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
      </Container>
    </MentorLayout>
  )
}

export default Info