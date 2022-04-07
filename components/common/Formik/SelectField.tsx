import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { FieldHookConfig, useField } from 'formik'
import React from 'react'

type selectFieldProps = {
  label: string,
  choices: string[] | number[]
}
const SelectField = ({
  label,
  choices,
  ...props
} : FieldHookConfig<string> & selectFieldProps) => {
  const [fields, meta] = useField(props)
  return (
    <FormControl>
      <InputLabel id={fields.name}>{label}</InputLabel>
      <Select
        labelId={fields.name}
        label={label}
        {...fields}
      >
        {choices.map((_item) => (
          <MenuItem key={_item} value={_item}>{_item}</MenuItem>
        ))}
        
      </Select>
      {meta.error && meta.touched && (
        <Typography color='error'>{meta.error}</Typography>
      )}
    </FormControl>
  )
}

export default SelectField