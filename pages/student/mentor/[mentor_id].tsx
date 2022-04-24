import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, CardMedia, Stack, Tab, Tabs, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { SyntheticEvent, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import Bio from '../../../components/student/Bio';
import MentorSchedule from '../../../components/student/MentorSchedule';
import { get } from '../../../services/request';
import { userType } from '../../../types/types';
import { getImageUrl } from '../../../utils/getImageUrl';

interface MentorProps {
  mentor_details: userType
}
const Mentor = ({mentor_details} : MentorProps) => {
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
            <MentorSchedule />
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
    console.log(mentor_details);
    return {
      props : {
        mentor_details : mentor_details.data
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