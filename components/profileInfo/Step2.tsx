import { Autocomplete, AutocompleteRenderOptionState, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import React, { SyntheticEvent, useRef, useState } from 'react'

type step2PropsType = {
  setActiveStepHandler: Function
}
const Step2 = ({setActiveStepHandler} : step2PropsType) => {
  const languages = ['javascript', 'java', 'python',1,2,3,4,5,6,7,3,8];
  const [userLanguages, setUserLanguages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);


  const deleteLangHandler = (index : number) => {
    const filteredLanguages = userLanguages.filter((_, i) => i !== index);
    setUserLanguages(filteredLanguages);
  }

  const addLangHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLLIElement;
    setShowError(false);
    const value = target.innerText;
    if (!userLanguages.includes(value)) {
      setUserLanguages([...userLanguages, value]);
    }
    setInputValue('');
  };

  return (
    <Stack
      maxWidth={500}
      spacing={2}
      sx={{
        margin: 'auto'
      }}
    >
      <Autocomplete
        options={languages}
        clearOnEscape={true}
        renderInput={(params) => <TextField {...params} label='Programming languages'/>}
        onChange={addLangHandler}
        inputValue={inputValue}
      />
      {showError && (
        <Typography color='error'>
          Add Technologies to teach
        </Typography>
      )}
      <Stack
        flexWrap='wrap'
        direction='row'
        justifyContent='flex-start'
        // spacing={1}
      >
        {userLanguages.map((_lang, i) => (
          <Chip 
            key={i} 
            label={_lang}
            color='primary'
            sx={{
              fontSize: 20,
              padding: 2,
              width: 'max-content',
              m: .4
            }}
            onDelete={() => deleteLangHandler(i)}
          />
        ))}

      </Stack>

      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{
          marginTop: '100px !important'
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          onClick={() => setActiveStepHandler(0)}
        >
          Back
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            if(userLanguages.length > 0){
              setActiveStepHandler(2)
            } else {
              setShowError(true)
            }
          }}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}

export default Step2