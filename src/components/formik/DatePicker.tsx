import {
  DesktopDatePickerProps,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import { Field, FieldProps } from "formik";

export function DatePicker({ name, ...props }: DesktopDatePickerProps<any> & { name: string }) {
  return <Field name={name}>
    {function(fieldProps: FieldProps) {
      const { field: { value }, form: { setFieldValue }, meta: { touched, error } } = fieldProps;

      return <DesktopDatePicker
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
