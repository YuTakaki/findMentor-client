import React from 'react'
import Layout from '../../components/layout/Layout'
import { Box, Button, ButtonGroup, Container, Grid, Stack, TextField, Typography,} from '@mui/material'
import MentorCard from '../../components/student/MentorCard';
import styled from '@emotion/styled';

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
              },
              overflow: 'auto'
            }}
          >
            <Box
              sx={{
                position: 'fixed',
                width: filterContainerWidth,
                maxHeight: '90vh',
                padding: 2,
                paddingTop: 4,
                paddingLeft: 0,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gridGap: '10px'
              }}
            >
              <form>
                <TextField 
                  fullWidth
                  label='search'
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  fullWidth
                  sx={{
                    marginTop: 1
                  }}
                >Search</Button>
              </form>
              <Box sx={{marginTop: 2}}>
                <Typography variant='body1'>Skills</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gridGap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  {['java', 'javascript', 'python', 'react', 'css', 'html', 'ruby', 'python', 'django'].map(_skill => (
                    <Button key={_skill} variant='contained'>{_skill}</Button>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant='body1'>Salary</Typography>
                <Stack spacing={2} direction='row'>
                  <TextField type='number' label='min' />
                  <TextField type='number' label='max' />
                </Stack>
              </Box>
            </Box>

          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default FindMentor