import React, { useEffect, useState } from 'react'
import MentorLayout from '../../components/layout/MentorLayout'
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
import { FormControl, InputLabel, Menu, MenuItem, Select, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import PrivateRoute from '../../components/hoc/PrivateRoute';

type schedulesType = {
  id: number,
  startDate: Date | string,
  endDate: Date | string,
  title: string,
  note: string,
  rRule: string
}


const Calendar = () => {
  const currentDate = new Date();
  const [schedules, setSchedules] = useState<schedulesType[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [category, setCategory] = useState('Schedule');

  useEffect(() => {
    (async() => {
      try {
        const user_schedules = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/schedule`, {withCredentials: true});
        setSchedules(user_schedules.data);
      } catch (error) {
        console.log(error);
      }
    })();

  }, []);

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/schedule`,schedules, {withCredentials: true});
  }, [schedules]);

  const handleClose = () => {
    setAlertOpen(false);
  }

  const onCommitChanges = async(props: any) => {
    try {
      const {added, changed, deleted} = props

      if (added) {
        const startingAddedId = schedules.length > 0 ? schedules[schedules.length - 1].id + 1 : 0;
        setSchedules([...schedules, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setSchedules(schedules.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      }
      if (deleted !== undefined) {
        setSchedules(schedules.filter(appointment => appointment.id !== deleted));
      }
    } catch (error:any) {
      console.log(error)
      console.log(error.response);
    }
  };


  
  return (
    <MentorLayout>
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
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <EditRecurrenceMenu />
          <IntegratedEditing />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <ConfirmationDialog />
          <AppointmentForm/>
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </MentorLayout>
  )
}

export default PrivateRoute(Calendar);