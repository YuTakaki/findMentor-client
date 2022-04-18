import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'



const FilterOptions = () => {
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
    </>
  )
}

export default FilterOptions