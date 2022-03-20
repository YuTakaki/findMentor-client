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

const Info = () => {
  const steps = ['User Information', 'Programming languages', 'Pay Rate']
  return (
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
            <Step key={step} completed={i < 2 && true}>
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
          width={'30%'}
          alignItems='center'
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
            <Button>
              Upload Image
            </Button>

          </label>
          <input type='file' id='file' hidden />
        </Stack>
        <Box
          component="form"
          width={'70%'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gridGap: 20
          }}
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
          >
            Sumbit
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}

export default Info