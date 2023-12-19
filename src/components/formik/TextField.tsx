import { TextField as MTextField, TextFieldProps } from "@mui/material";
import { Field, FieldProps } from "formik";

export function TextField(props: TextFieldProps) {
  return <Field name={props.name}>
    {({ field, meta }: FieldProps) => (
      <MTextField
        error={Boolean(meta?.touched && meta?.error)}
        helperText={meta?.touched && meta?.error}
        {...field}
        {...props}
      />
    )}
  </Field>;
}
