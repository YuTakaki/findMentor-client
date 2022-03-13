import { TextField, Typography } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React from 'react'

type InputFieldPropsType = {
  label : string
};
const InputField = ({
  label,
  type,
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
        required
        fullWidth
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