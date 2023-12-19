import {
  DateTimePicker, DateTimePickerProps,
} from "@mui/x-date-pickers";
import { Field, FieldProps } from "formik";

export function DatetimePicker({ name, ...props }: DateTimePickerProps<any> & { name: string }) {
  return <Field name={name}>
    {function(fieldProps: FieldProps) {
      const { field: { value }, form: { setFieldValue }, meta: { touched, error } } = fieldProps;

      return <DateTimePicker
        {...props}
        value={value}
        onChange={(value) => setFieldValue(name, value)}
        slotProps={{
          textField: {
            error: Boolean(touched && error),
            helperText: touched && error,
          },
        }}
      />;
    }}
  </Field>;
}
