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
import { GetServerSideProps } from 'next';
import { get } from '../../services/request';

interface CalendarProps {
  schedules : schedulesType[]
}

const Calendar = ({schedules} : CalendarProps) => {
  const currentDate = new Date();
  const [alertOpen, setAlertOpen] = useState(false);

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
            showCloseButton
          />
        </Scheduler>
      </Paper>
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async({req}) => {
  try {
    const schedule = await get('/api/schedules', {
      headers: {
        Cookie : req.headers.cookie!
      }
    })
    return {
      props : {
        schedules : schedule.data
      }
    }
  } catch (error) {
    console.log(error);
    return {
      props : {}
    }
  }
}

export default Calendar;