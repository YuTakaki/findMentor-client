import styled from '@emotion/styled';
import { Box, Card, Drawer, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../components/layout/Layout'

const filterContainerWidth = 300;

const CustomCard = styled(Card)(({
  padding: 10,
  minHeight: 150,
  maxHeight: '358px',
  display: 'flex',
  flexDirection: 'column',
}));

const FindMentor = () => {
  return (
    <Layout>
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
                <CustomCard>
                  {i}
                </CustomCard>

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
              minHeight: '80vh'
            }}
          >

          </Box>

        </Box>
      </Stack>
    </Layout>
  )
}

export default FindMentor