import { Avatar, Button, Card, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { RootStateOrAny, useSelector } from 'react-redux';
import theme from '../../styles/theme/theme';
import Layout from '../../components/layout/Layout';

const CustomCard = styled(Card)(({
  padding: 10,
  minHeight: 150,
  maxHeight: '358px',
  display: 'flex',
  flexDirection: 'column'
}));

const Index = () => {
  const mode = useSelector((state : RootStateOrAny) => state.themeReducer);
  const style = theme(mode);
  return (
    <Layout>
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
          <Grid item xs={12} sm={6} md={4}>
            <CustomCard 
              sx={{
                backgroundColor: style.palette.secondary.main, 
                padding: '20px 30px!important', 
                color: style.palette.secondary.contrastText
              }} 
              elevation={1}
            >
              <Typography>Total Earnings</Typography>
              <Typography fontWeight={700} variant='h4'>5,000</Typography>
            </CustomCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomCard 
              sx={{
                backgroundColor: style.palette.success.main,
                padding: '20px 30px!important',
                color: style.palette.success.contrastText
              }}
              elevation={1}
            >
              <Typography>Languages</Typography>
              <Typography fontWeight={700} variant='h4'>5,000</Typography>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={4}>
          <CustomCard 
              sx={{
                backgroundColor: style.palette.error.main,
                padding: '20px 30px!important',
                color: style.palette.error.contrastText
              }}
              elevation={1}
            >
              <Typography>Total Earnings</Typography>
              <Typography fontWeight={700} variant='h4'>5,000</Typography>
            </CustomCard>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{
                width: '100%',
                gap: 3
              }}
              flexWrap='wrap'
              // spacing={3}
            >
              <CustomCard sx={{height: '100%', flex: 1, minWidth: '200px'}} elevation={1}>
                <Typography
                  textAlign='center'
                  variant='h6'
                  fontWeight={700}
                >
                  Top Students
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
                  >
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Yu Takaki" />
                  </ListItem>

                ))}
                </List>
              </CustomCard>
              <CustomCard sx={{height: '100%', flex: 1, minWidth: 300}} elevation={1}>
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Index;