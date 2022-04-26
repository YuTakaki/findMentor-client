import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { post } from '../../services/request';

const AppointmentToolTipContent = (({
  children, appointmentData, ...restProps
} : any) => {
  const route = useRouter();
  const { mentor_id }= route.query;
  const handleClick = async() => {
    try {
      await post(`/api/schedules/${mentor_id}`, appointmentData)
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Button variant='contained' fullWidth onClick={handleClick}>Book</Button>
    </AppointmentTooltip.Content>
  )
});

export default AppointmentToolTipContent