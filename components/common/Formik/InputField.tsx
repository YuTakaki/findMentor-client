import { TextField, Typography } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React from 'react'

type InputFieldPropsType = {
  label : string,
  multiline?: boolean,
  minRows?: number,
};
const InputField = ({
  label,
  type,
  multiline = false,
  minRows = 1,
  ...props
 } : FieldHookConfig<string> & InputFieldPropsType) => {

  const [fields, meta] = useField(props);
  return (
    <div>
      <TextField 
        error={meta.touched && meta.error ? true : false}
        label={label}
        type={type}
        {...fields}
        fullWidth
        minRows={minRows}
        multiline={multiline}
      />
      {meta.touched && meta.error && (
        <Typography
          color="error"
        >
          {meta.error}
        </Typography>
      )}
    </div>
  )
}

export default InputField