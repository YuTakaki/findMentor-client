import { Autocomplete, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { get, post } from '../../services/request';
import { StepPropType } from '../../types/types';

const Step2 = ({setActiveStepHandler} : StepPropType) => {
  const languages = ['javascript', 'java', 'python',1,2,3,4,5,6,7,3,8];
  const [userLanguages, setUserLanguages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    (async() => {
      try {
        const getUsersProgLanguages = await get(`/api/skills/`);
        const data = getUsersProgLanguages.data.skills.map((_data : {skill : string}) => _data.skill)
        setUserLanguages(data);
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


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

  const saveHandler = async() => {
    try {
      if(userLanguages.length > 0){
        await post('/api/skills/', userLanguages);
        setActiveStepHandler(2)
      } else {
        setShowError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
          onClick={saveHandler}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}

export default Step2