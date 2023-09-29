import { Field } from "formik";

interface Props {
  name: string,
  label: string,
  error?: string,
  value?: number | string,
  touched?: boolean
}

const isFieldInvalid = (
  touched: boolean,
  error: boolean,
  value: boolean
): string | undefined => {
  if (value) return "false";
  if (touched && error) return "true";
  return undefined;
};


export const Fieldset = ({ name, label, error, value, touched }: Props) => (
  <fieldset>
    <label htmlFor={name}>
      {label}
    </label>
    <Field
      name={name}
      type="number"
      placeholder="1-100"
      aria-invalid={isFieldInvalid(!!touched, !!error, !!value)}
    />
    {touched && error && (
      <small>{error}</small>
    )}
  </fieldset>
);