import {
  Autocomplete as MAutocomplete,
  AutocompleteProps as MAutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import { useState } from "react";
import toast from "@/utils/toast";

interface AutocompleteProps extends MAutocompleteProps<any, any, any, any> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  getOptions: (searchText: string) => Promise<any[]>;
  initialOptions?: any[];
  textFieldProps?: TextFieldProps;
}

export function Autocomplete({ textFieldProps, ...props }: AutocompleteProps) {
  const [loading, setLoading] = useState(false);
  const { initialOptions, getOptions } = props;
  const [options, setOptions] = useState<any[]>(initialOptions ?? []);

  const fetchOptions = async (searchText: string) => {
    setLoading(true);
    try {
      const _options = await getOptions(searchText);
      setOptions(_options);
    } catch (e) {
      toast.error(e);
    }
    setLoading(false);
  };

  return <Field name={props.name}>
    {function(fieldProps: FieldProps) {
      const { field: { value }, form: { setFieldValue }, meta: { touched, error } } = fieldProps;

      return <MAutocomplete
        {...props}
        loading={loading}
        options={options}
        value={value}
        onChange={(_, value) => setFieldValue(props.name, value)}
        onInputChange={(_, value) => fetchOptions(value)}
        onOpen={() => fetchOptions("")}
        renderInput={(params) => <TextField
          error={Boolean(touched && error)}
          helperText={touched && error}
          {...params}
          {...textFieldProps} />}
      />;
    }}
  </Field>;
}
