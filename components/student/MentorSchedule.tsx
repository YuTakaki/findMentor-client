import React, { useState } from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { schedulesType } from '../../types/types';
import { Button, Paper } from '@mui/material';

interface MentorScheduleProps {
  mentor_schedules : schedulesType[]
}

const Content = (({
  children, appointmentData, ...restProps
} : any) => {
  const handleClick = () => {
    console.log(appointmentData);
  }
  return (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Button variant='contained' fullWidth onClick={handleClick}>Book</Button>
    </AppointmentTooltip.Content>
  )
});


const MentorSchedule = ({mentor_schedules} : MentorScheduleProps) => {
  const currentDate = new Date();
  return (
    <Paper>
      <Scheduler
        data={mentor_schedules}
      >
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <DayView 
          startDayHour={6}
          endDayHour={24}
        />
        <WeekView
          startDayHour={8}
          endDayHour={22}
        />
        <MonthView />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <Appointments 
          
        />
        <AppointmentTooltip
          contentComponent={Content}
        />
      </Scheduler>
    </Paper>
  )
}

export default MentorSchedule