import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, CardMedia, Stack, Tab, Tabs, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { SyntheticEvent, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import Bio from '../../../components/student/Bio';
import MentorSchedule from '../../../components/student/MentorSchedule';
import { get } from '../../../services/request';
import { schedulesType, userType } from '../../../types/types';
import { getImageUrl } from '../../../utils/getImageUrl';

interface MentorProps {
  mentor_details: userType,
  mentor_schedules: schedulesType[]
}
const Mentor = ({mentor_details, mentor_schedules} : MentorProps) => {
  const [currentView, setCurrentView] = useState('bio');

  const changeCurrentView = (e: SyntheticEvent, value: string) => {
    setCurrentView(value);
  }
  return (
    <Layout>
      <Box>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            padding: 5,
            paddingBottom: 3,
            paddingTop: 1
          }}
        >
          <Box>
            <CardMedia
              component='img'
              src={getImageUrl(mentor_details)}
              sx={{
                width: 150,
                height: 150,
                borderRadius: 150
              }}
            />
            <Typography variant='h5' textAlign='center'>Yu Takaki</Typography>
          </Box>
        </Stack>
        <TabContext value={currentView} >
          <TabList
            onChange={changeCurrentView}
            sx={{borderBottom: '1px solid silver'}}
          >
            <Tab label="bio" value="bio"/>
            <Tab label="review" value="review"/>
            <Tab label="schedule" value="schedule"/>
          </TabList>

          <TabPanel value='bio'>
            <Bio mentor_details={mentor_details} />
          </TabPanel>
          <TabPanel value='review'>Review</TabPanel>
          <TabPanel value='schedule'>
            <MentorSchedule mentor_schedules={mentor_schedules}/>
          </TabPanel>
        </TabContext>

      </Box>
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async({params, req}) => {
  try {
    const mentor_id = params!.mentor_id;
    const mentor_details = await get(`/api/mentor/${mentor_id}`, {headers: {
      Cookie: req.headers.cookie!
    }});

    const mentor_schedules = await get(`/api/mentors/schedules/${mentor_id}`, {headers: {
      Cookie: req.headers.cookie!
    }});
    console.log(mentor_schedules.data);
    return {
      props : {
        mentor_details : mentor_details.data,
        mentor_schedules: mentor_schedules.data,
      }
    }
    
  } catch (error) {
    console.log(error);
    return {
      props: {}
    }
  }
}

export default Mentor