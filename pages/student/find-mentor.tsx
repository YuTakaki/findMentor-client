import React, { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Box, Button, Container, Fab, Grid, IconButton, Modal, Stack, TextField, Typography, Card} from '@mui/material'
import MentorCard from '../../components/student/MentorCard';
import Link from 'next/link';
import FilterOptions from '../../components/student/FilterOptions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/styles';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { userType } from '../../types/types';

const filterContainerWidth = 300;

const CustomBox = styled(Box)(({
  position: 'fixed',
  maxHeight: '90vh',
  padding: 2,
  paddingTop: 4,
  paddingLeft: 0,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gridGap: '10px'
}))

type FindMentorProps = {
  mentors_data: any[]
}
const FindMentor = ({mentors_data} : FindMentorProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const [mentors, setMentors] = useState<userType[]>(mentors_data || []);
  const [filterOptions, setFilterOptions] = useState({
    skills : [],
    willSearch: false,
    min_pay_rate : '',
    max_pay_rate : '',
  });

  const closeModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    if(filterOptions.willSearch === true){
      (async() => {
        try {
          const filterMentor = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/filter?skills=${filterOptions.skills}&min=${filterOptions.min_pay_rate}&max=${filterOptions.max_pay_rate}`, {withCredentials: true});
          setMentors(filterMentor.data.mentors);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [filterOptions]);

  const reset = (willSearch : boolean) => {
    setFilterOptions({
      willSearch,
      skills : [],
      min_pay_rate : '',
      max_pay_rate : '',
    });
  }

  const searchMentorByKeyword = async(e : SyntheticEvent) => {
    try {
      e.preventDefault();
      const searchMentors = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/?q=${search}`, {withCredentials: true});
      setMentors(searchMentors.data.mentors);
      reset(false);
    } catch (error) {
      console.log(error);
    }
  }
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
              <Box
                sx={{
                  padding: 4
                }}
              >
                <form onSubmit={searchMentorByKeyword}>
                  <TextField 
                    fullWidth
                    label='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
              </Box>
            <Grid
              container
              sx={{
                padding: 4,
                paddingTop: 0
              }}
              spacing={3}
            >
              {mentors.map((mentor) => (
                <Grid
                  item
                  key={mentor.id}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <Link href='/s'>
                    <a>
                      <MentorCard details={mentor}/>
                    </a>
                  </Link>
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
            }}
          >
            <CustomBox sx={{width: filterContainerWidth}}>
              <FilterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} reset={reset}/>
            </CustomBox>

          </Box>
        </Stack>
        <Box sx={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          display: {
            xs: 'block',
            md: 'none'
          }
        }}>
          <Fab color="primary" onClick={() => setOpenModal(true)}>
            <FilterAltIcon />
          </Fab>
        </Box>
        <Modal
          open={openModal}
          onClose={closeModal}
          sx={{
            display: {
              xs: 'block',
              md: 'none'
            }
          }}
        >
          <Card
            sx={{
              width: '90%',
              height: '80vh',
              overflow: 'auto',
              maxWidth: '400px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              minHeight: '10px',
              padding: 3
            }}
          >
            <Box sx={{marginLeft: 'auto', width: 'max-content'}}>
              <IconButton onClick={closeModal} >
                <CloseIcon fontSize='large'/>
              </IconButton>

            </Box>
            <FilterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} reset={reset}/>
          </Card>
        </Modal>
      </Container>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async({req}) =>{
  try {
    const getMentors = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor`, {
      withCredentials: true, 
      headers: {
        Cookie: req.headers.cookie!
      }});

    return {
      props : {
        mentors_data : getMentors.data.mentors
      }
    }
    
  } catch (error : any) {
    console.log(error.response);

    return {
      props : {}
    }
  }
}
export default FindMentor