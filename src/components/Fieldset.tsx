import { Field } from "formik";

interface Props {
  name: string,
  label: string | React.ReactElement,
  error?: string,
  value?: number | string,
  touched?: boolean
}

const isFieldInvalid = (
  touched: boolean,
  error: boolean,
  value: boolean
): string | undefined => {
  if (value && !error) return "false";
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
      aria-invalid={isFieldInvalid(!!touched, !!error, !!value)}
    />
    {touched && error && (
      <small>{error}</small>
    )}
  </fieldset>
);