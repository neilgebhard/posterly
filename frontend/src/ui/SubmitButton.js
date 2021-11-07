const SubmitButton = ({ children, loading, className = "" }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 disabled:opacity-50 px-4 py-1 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
