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

const MentorSchedule = () => {
  const currentDate = new Date();
  const [schedules, setSchedules] = useState<schedulesType[]>([]);
  return (
    <Paper>
      <Scheduler
        data={schedules}
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
          showOpenButton
          showDeleteButton
        />
      </Scheduler>
    </Paper>
  )
}

export default MentorSchedule