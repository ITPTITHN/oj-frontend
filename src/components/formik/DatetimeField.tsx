import { DateTimeField as MDateTimeField, DateTimeFieldProps } from "@mui/x-date-pickers";
import { Field, FieldProps } from "formik";

export function DatetimeField(props: DateTimeFieldProps<any> & { name: string }) {
  return <Field name={props.name}>
    {function(fieldProps: FieldProps) {
      const { field: { value }, form: { setFieldValue }, meta: { touched, error } } = fieldProps;

      return <MDateTimeField
        {...props}
        value={value}
        onChange={(value) => setFieldValue(props.name, value)}
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
