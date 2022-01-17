import { useField, Field, FieldAttributes } from "formik";
import Error from "../components/Error";

type Props = {
  label?: string;
} & FieldAttributes<{}>;

const TextInput = ({ label = "", className = "", ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field
        className={`appearance-none relative block w-full px-3 py-2 text-xl border border-gray-300 text-gray-900 md:rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 ${className}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <Error error={meta.error} /> : null}
    </div>
  );
};

export default TextInput;
