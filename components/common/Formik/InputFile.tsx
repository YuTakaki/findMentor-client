import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Input, TextField, Typography } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React from 'react'

type InputFilePropsType = {
  label : string,
  setPreviewImg?: Function,
};
const InputFile = ({
  label,
  setPreviewImg,
  ...props
 } : FieldHookConfig<string> & InputFilePropsType) => {

  const [fields, meta] = useField(props);
  return (
    <>
      <label htmlFor="icon-button-file">
        <Input 
          id="icon-button-file" 
          type="file" 
          {...fields} 
          sx={{
            display: 'none'
          }}
          onChange={(e) => {
            if(setPreviewImg){
              setPreviewImg(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      {meta.touched && meta.error && (
        <Typography
          color="error"
        >
          {meta.error}
        </Typography>
      )}
    </>
  )
}

export default InputFile