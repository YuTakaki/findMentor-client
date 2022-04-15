import styled from '@emotion/styled';
import { Avatar, Card, IconButton, List, ListItem, Typography,} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Rating from '@mui/material/Rating';

const CustomCard = styled(Card)(({
  padding: 10,
  minHeight: 150,
  maxHeight: '358px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #afbbcb'
}));

const MentorCard = () => {
  return (
    <CustomCard elevation={1}>
      <Avatar
        sx={{
          width: '50px',
          height: '50px'
        }}
      ></Avatar>
      <Typography variant="body1">Yu Takaki</Typography>
      <Typography variant="caption">Software Engineer</Typography>
      <Rating name="read-only" value={3} readOnly />
      <List
        disablePadding
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <ListItem disablePadding sx={{width: 'max-content'}}>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </ListItem>
        <ListItem disablePadding sx={{width: 'max-content'}}>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </ListItem>
        <ListItem disablePadding sx={{width: 'max-content'}}>
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </ListItem>
      </List>
    </CustomCard>
  )
}

export default MentorCard