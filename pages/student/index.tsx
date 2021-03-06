import { Avatar, Button, Card, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { RootStateOrAny, useSelector } from 'react-redux';
import theme from '../../styles/theme/theme';
import Layout from '../../components/layout/Layout';
import { CalendarPicker, LocalizationProvider, PickersDayProps } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MentorCard from '../../components/student/MentorCard';
import Calendar from 'react-calendar';
import { GetServerSideProps } from 'next';
import { get } from '../../services/request';
import { schedulesType } from '../../types/types';
import 'react-calendar/dist/Calendar.css';

interface StudentDashboardProps {
  schedules : string[]
}

const CustomCard = styled(Card)(({
  padding: 10,
  minHeight: 150,
  maxHeight: '358px',
  display: 'flex',
  flexDirection: 'column',
}));


const StudentDashboard = ({ schedules } : StudentDashboardProps) => {
  console.log(schedules.map(sched => new Date(sched)))
  const mode = useSelector((state : RootStateOrAny) => state.themeReducer);
  const style = theme(mode);
  return (
    <Layout>
      <Container>
        <Grid
          container
          spacing={3}
          sx={{
            padding: 2
          }}
        >
          <Grid item xs={12} md={8}>
            <CustomCard>
            <Typography
                  textAlign='center'
                  variant='h6'
                  fontWeight={700}
                >
                  Today&apos; lesson
                </Typography>
                <List
                  sx={{
                    flex: 1,
                    overflow: 'auto'
                  }}
                >
                {[1,2,3,4,5,6,8,7].map(_i => (
                  <ListItem
                    key={_i}
                    secondaryAction={<Button size='small' variant='contained' color='secondary'>Join</Button>}
                  >
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant='body1' fontWeight={500} >Yu Takaki</Typography>
                      <Typography variant='body2' color={style.palette.grey[600]}>10:00</Typography>
                    </ListItemText>
                  </ListItem>

                ))}
                </List>
            </CustomCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <Calendar value={schedules.length > 0 ? schedules.map(sched => new Date(sched)) : null} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h4' fontWeight={700} color='primary'>Previous Mentors</Typography>
            <Grid container spacing={3} sx={{paddingTop: 3}}>
              {[1,2,3,4,5,6].map((i) => (
                <Grid item key={i} xs={12} sm={4} md={3}>
                  {/* <MentorCard de /> */}
                </Grid>
              ))}

            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async({req}) => {
  try {
    const schedules = await get('/api/schedules',{headers: {
      Cookie: req.headers.cookie!
    }});
    return {
      props: {
        schedules : schedules.data.map((sched : schedulesType)=> sched.startDate)
      }
    }
  } catch (error) {
    return {
      props: {}
    }
    
  }
}
export default StudentDashboard