const SubmitButton = ({ children, loading, className = "", ...rest }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-400 disabled:opacity-50 px-4 py-1 rounded-full ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
