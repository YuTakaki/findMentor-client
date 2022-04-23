import styled from '@emotion/styled';
import { Avatar, Card, CardMedia, IconButton, List, ListItem, Typography,} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Rating from '@mui/material/Rating';
import { userType } from '../../types/types';
import { getImageUrl } from '../../utils/getImageUrl';
import Link from 'next/link';

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

interface MentorCardProps {
  details : userType
}
const MentorCard = ({details} : MentorCardProps) => {
  return (
    <Link href={`mentor/${details.id}`}>
      <a>
      <CustomCard elevation={1}>
        <CardMedia
          component="img"
          image={getImageUrl(details)}
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50px'
          }}
        />
        <Typography variant="body1">{details.first_name} {details.last_name}</Typography>
        <Typography variant="caption">{details.job_position}</Typography>
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
      </a>
    </Link>
    
  )
}

export default MentorCard