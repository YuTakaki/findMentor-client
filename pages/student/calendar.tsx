import React, { useEffect, useState } from 'react'
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
  DateNavigator,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Layout from '../../components/layout/Layout';
import { schedulesType } from '../../types/types';



const Calendar = () => {
  const currentDate = new Date();
  const [schedules, setSchedules] = useState<schedulesType[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

  const handleClose = () => {
    setAlertOpen(false);
  }


  return (
    <Layout>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} variant="filled" severity="error">
          Conflicting Schedules
        </Alert>
      </Snackbar>
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
    </Layout>
  )
}

export default Calendar;