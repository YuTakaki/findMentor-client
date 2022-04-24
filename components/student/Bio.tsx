import { Box, Typography } from '@mui/material'
import React from 'react'
import { userType } from '../../types/types'

interface MentorProps {
  mentor_details: userType
}

interface InfoBoxProps {
  label: string
  value: string
}

const InfoBox = ({label, value} : InfoBoxProps) => {
  return (
    <Box marginY={2} sx={{maxWidth: '600px'}}>
      <Typography
        variant="h6"
      >{label}</Typography>
      <Typography
        variant='body1'
        textAlign="justify"
      >{value}</Typography>
    </Box>
  )

}
const Bio = ({mentor_details} : MentorProps) => {
  return (
    <Box>
      <InfoBox label='Name' value={`${mentor_details.first_name} ${mentor_details.last_name}`}/>
      <InfoBox label='Email' value={mentor_details.email}/>
      <InfoBox label='Pay Rate' value={mentor_details.pay_rate}/>
      <InfoBox label='Job Position' value={mentor_details.job_position}/>
      <InfoBox label='Bio' value={mentor_details.bio}/>      
    </Box>
  )
}

export default Bio