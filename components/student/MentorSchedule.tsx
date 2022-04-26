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
import { Paper } from '@mui/material';
import AppointmentToolTipContent from './AppointmentToolTipContent';

interface MentorScheduleProps {
  mentor_schedules : schedulesType[]
}


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
          contentComponent={AppointmentToolTipContent}
        />
      </Scheduler>
    </Paper>
  )
}

export default MentorSchedule