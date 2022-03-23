import React, { useState } from 'react'
import { 
  Container,  
  Step, 
  StepLabel, 
 } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/material/node_modules/@mui/system';
import Step1 from '../../components/profileInfo/Step1';



const Info = () => {
  const steps = ['User Information', 'Programming languages', 'Pay Rate'];
  const [activeStep, setActiveStep] = useState(0);

  const setActiveStepHandler = (step_num : number) => {
    setActiveStep(1);
  }

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
          activeStep={activeStep}
        >
          {steps.map((step, i) => (
            <Step sx={{'& .MuiStepLabel-root .Mui-completed': {
              color: 'secondary',
            }}} key={step} completed={i < activeStep && true}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}

        </Stepper>
      </Box>
      {activeStep === 0 ? (
        <Step1 setActiveStepHandler={setActiveStepHandler}/>
      ) : (
        <></>
      )}
    </Container>
  )
}

export default Info