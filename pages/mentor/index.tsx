import { Box, Card, Container, Grid, Stack } from '@mui/material'
import PrivateRoute from '../../components/hoc/PrivateRoute'
import MentorLayout from '../../components/layout/MentorLayout'
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import styled from '@emotion/styled'
import { RootStateOrAny, useSelector } from 'react-redux';
import theme from '../../styles/theme/theme';

const CustomCard = styled(Card)(({
  padding: 10,
  minHeight: 150,
}));

const Index = () => {
  const mode = useSelector((state : RootStateOrAny) => state.themeReducer);
  const style = theme(mode);
  return (
    <MentorLayout>
      <Container>
        <Grid
          container
          spacing={3}
          flexWrap='wrap'
          sx={{
            padding: 2,
            marginY: 'auto'
          }}
        >
          <Grid item xs={6} sm={6} md={4}>
            <CustomCard sx={{backgroundColor: style.palette.secondary.main}} elevation={1}>
            </CustomCard>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <CustomCard sx={{backgroundColor: style.palette.success.main}} elevation={1}>
              1
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomCard sx={{backgroundColor: style.palette.error.main}} elevation={1}>
              1
            </CustomCard>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent='center'
              sx={{
                width: '100%',
                gap: 3
              }}
              flexWrap='wrap'
              // spacing={3}
            >
              <CustomCard 
                sx={{
                  height: '100%',
                  maxWidth: '400px',
                  '& .MuiCalendarPicker-root' : {
                  width : 'max-content'
                  }}}
                elevation={0}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  sx={{
                    
                  }}
                >
                  <CalendarPicker date={new Date()} onChange={(newDate) => console.log(newDate)} />
                </LocalizationProvider>
              </CustomCard>
              
              <CustomCard sx={{height: '100%', flex: 1, minWidth: '200px'}} elevation={1}>
                1
              </CustomCard>
              <CustomCard sx={{height: '100%', flex: 1, minWidth: '200px'}} elevation={1}>
                1
              </CustomCard>

            </Stack>
          </Grid>
          {/* <Grid item xs={12} sm={7}>
          </Grid>
          <Grid item xs={12} sm={5}>
          </Grid>
          <Grid item xs={12}>
          </Grid> */}

        </Grid>
      </Container>
    </MentorLayout>
  )
}

export default PrivateRoute(Index);