import { useField } from "formik";
import Error from "../components/Error";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="appearance-none relative block w-full px-3 py-2 text-3xl border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <Error error={meta.error} /> : null}
    </div>
  );
};

export default TextInput;
