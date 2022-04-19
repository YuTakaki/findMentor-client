import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

type filterOptionsType = {
  skills : string[],
  min_pay_rate: string | number,
  max_pay_rate: string | number,
}
interface FilterOptionsProps {
  filterOptions : filterOptionsType,
  setFilterOptions : Function
}

const FilterOptions = ({
  filterOptions,
  setFilterOptions,
} : FilterOptionsProps) => {

  const skillsOption = ['java', 'javascript', 'python', 'react', 'css', 'html', 'ruby', 'django'];

  const handleFilterSkills = (value: string) => {
    let data;
    if (filterOptions.skills.includes(value)) {
      data = filterOptions.skills.filter(_skill => _skill !== value);
    } else {
      data = [...filterOptions.skills, value];
    }
    setFilterOptions({
      ...filterOptions,
      skills : data
    });
  };

  const reset = () => {
    setFilterOptions([]);
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
              variant={filterOptions.skills.includes(_skill) ? 'contained' : 'outlined'}
              onClick={() => handleFilterSkills(_skill)}
            >{_skill}</Button>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant='body1'>Salary</Typography>
        <Stack spacing={2} direction='row'>
          <TextField 
            type='number' 
            label='min'
            value={filterOptions.min_pay_rate}
            onChange={(e) => setFilterOptions({...filterOptions, min_pay_rate : e.target.value})}
          />
          <TextField 
            type='number' 
            label='max'
            value={filterOptions.max_pay_rate}
            onChange={(e) => setFilterOptions({...filterOptions, max_pay_rate : e.target.value})}
          />
        </Stack>
      </Box>
      <Button variant='contained' onClick={reset}>Reset</Button>
    </>
  )
}

export default FilterOptions