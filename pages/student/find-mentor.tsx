import React from 'react'
import Layout from '../../components/layout/Layout'
import { Box, Container, Grid, Stack,} from '@mui/material'
import MentorCard from '../../components/student/MentorCard';

const filterContainerWidth = 300;


const FindMentor = () => {
  return (
    <Layout>
      <Container>
        <Stack
          direction='row'
        >
          <Box
            sx={{
              width: {
                xs : '100%',
                md : `calc(100% - ${filterContainerWidth}px)`
              }
            }}
          >
            <Grid
              container
              sx={{
                padding: 4,
                
              }}
              spacing={3}
            >
              {[1,2,3,4,5,6,7,8,9,0].map((i) => (
                <Grid
                  item
                  key={i}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <MentorCard/>
                </Grid>
              ))}

            </Grid>
          </Box>
          <Box
            sx={{
              width: filterContainerWidth,
              display: {
                xs : 'none',
                md : 'block'
              }
            }}
          >
            <Box
              sx={{
                position: 'fixed',
                width: filterContainerWidth,
                minHeight: '80vh',
                padding: 2,
                paddingTop: 4,
                paddingLeft: 0
              }}
            >
              

            </Box>

          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default FindMentor