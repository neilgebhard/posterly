import { useField, Field, FieldAttributes } from "formik";

type Props = {
  label?: string;
} & FieldAttributes<{}>;

const TextArea = ({ label = "", ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field
        as="textarea"
        rows={3}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full px-3 py-2 text-base border border-gray-300 md:rounded-md"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextArea;
