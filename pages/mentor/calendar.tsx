import React from 'react'
import MentorLayout from '../../components/layout/MentorLayout'
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';

const calendar = () => {
  const currentDate = new Date();
  const schedulerData = [
    { startDate: '2022-04-06T09:45', endDate: '2022-04-06T11:00', title: 'Meeting' },
    { startDate: '2022-04-06T12:00', endDate: '2022-04-06T13:30', title: 'Go to a gym' },
  ];
  return (
    <MentorLayout>
      <Paper sx={{flex: 1, overflow: 'auto'}}>
        <Scheduler
          data={schedulerData}
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
            startDayHour={6}
            endDayHour={24}
          />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <Appointments />
        </Scheduler>
      </Paper>
    </MentorLayout>
  )
}

export default calendar