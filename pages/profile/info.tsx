import React, { useEffect, useState } from 'react'
import { 
  Button,
  Container,  
  Step, 
  StepLabel, 
 } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/material/node_modules/@mui/system';
import Step1 from '../../components/profileInfo/Step1';
import Step2 from '../../components/profileInfo/Step2';
import { RootStateOrAny, useSelector } from 'react-redux';

const Info = () => {
  const steps = ['User Information', 'Programming languages', 'Pay Rate'];
  const [activeStep, setActiveStep] = useState<number>(NaN);
  const error = useSelector((state: RootStateOrAny) => state.authReducer.error);

  useEffect(() => {
    if (error !== null) {
      setActiveStep(error)
    }
  }, [error]);

  const setActiveStepHandler = (step_num : number) => {
    setActiveStep(step_num);
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
      ) : activeStep === 1 ? (
        <Step2 setActiveStepHandler={setActiveStepHandler}/>
      ) : (
        <>
          <Button onClick={() => setActiveStepHandler(1)}>sample</Button>
        </>
      )}
    </Container>
  )
}

export default Info;