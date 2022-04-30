import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator,
  DragDropProvider,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import { EditRecurrenceMenu } from '@devexpress/dx-react-scheduler-material-ui';
import { FormControl, MenuItem, Select, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Layout from '../../components/layout/Layout';
import { get, post } from '../../services/request';
import { mapAndFilterSchedule } from '../../utils/mapAndFilterSchedule';
import { GetServerSideProps } from 'next';
import { appointmentType, schedulesType } from '../../types/types';

interface CalendarProps {
  mentor_schedules : schedulesType[]
  user_appointments: appointmentType[]
}
const Calendar = ({mentor_schedules, user_appointments} : CalendarProps) => {
  const currentDate = new Date();
  const [schedules, setSchedules] = useState(mentor_schedules);
  const [alertOpen, setAlertOpen] = useState(false);
  const [category, setCategory] = useState('Schedule');

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

  const handleClose = () => {
    setAlertOpen(false);
  }

  const onCommitChanges = async(props: any) => {
    try {
      const {added, changed, deleted} = props;
      let data;

      if (added) {
        const startingAddedId = schedules.length > 0 ? schedules[schedules.length - 1].id + 1 : 0;
        data = [...schedules, { id: startingAddedId, ...added }]
        setSchedules(data);
      }
      if (changed) {
        data = schedules.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment))
        setSchedules(data);
      }
      if (deleted !== undefined) {
        data = schedules.filter(appointment => appointment.id !== deleted)
        setSchedules(data);
      }
      await post(`/api/mentors/schedules/`, data);

    } catch (error:any) {
      console.log(error)
      console.log(error.response);
    }
  };

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
      <FormControl>
        <Select
          value={category}
          sx={{ margin: 2}}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value='Schedule'>Schedule</MenuItem>
          <MenuItem value='Appointments'>Appointments</MenuItem>
        </Select>
      </FormControl>
      <Paper>
        <Scheduler
          data={category === 'Schedule' ? schedules : user_appointments}
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
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <EditRecurrenceMenu />
          <IntegratedEditing />
          <AppointmentTooltip
            showOpenButton={category === 'Schedule'}
            showDeleteButton={category === 'Schedule'}
          />
          <AppointmentForm/>
          <ConfirmationDialog />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </Layout>
  )
}
export const getServerSideProps : GetServerSideProps = async({req}) => {
  try {
    const user_schedules = await get('/api/mentors/schedules',{headers: {
      Cookie: req.headers.cookie!
    }});
    const user_appointments = await get('/api/schedules',{headers: {
      Cookie: req.headers.cookie!
    }});

    return {
      props : {
        mentor_schedules: mapAndFilterSchedule(user_schedules.data),
        user_appointments: user_appointments.data
      }
    }
    
  } catch (error) {
    console.log(error);
    return {
      props: {}
    }
  }
}
export default Calendar;