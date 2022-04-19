import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

interface FilterOptionsProps {
  skills : string[],
  setSkills : Function
}

const FilterOptions = ({
  skills,
  setSkills,
} : FilterOptionsProps) => {
  const skillsOption = ['java', 'javascript', 'python', 'react', 'css', 'html', 'ruby', 'python', 'django'];
  const handleFilterSkills = (value: string) => {
    let data;
    if (skills.includes(value)) {
      data = skills.filter(_skill => _skill !== value);
    } else {
      data = [...skills, value];
    }
    setSkills(data);
  }

  return (
    <>
      <Box>
        <Typography variant='body1'>Skills</Typography>
        <Box
          sx={{
            display: 'flex',
            gridGap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {skillsOption.map(_skill => (
            <Button 
              key={_skill}
              variant={skills.includes(_skill) ? 'contained' : 'outlined'}
              onClick={() => handleFilterSkills(_skill)}
            >{_skill}</Button>
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
    </>
  )
}

export default FilterOptions