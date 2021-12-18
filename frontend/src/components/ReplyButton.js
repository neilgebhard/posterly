import { ChatAlt2Icon } from "@heroicons/react/outline";

const ReplyButton = ({ children, ...rest }) => {
  return (
    <button
      id="reply-btn"
      type="button"
      {...rest}
      className="flex items-center gap-x-1 text-gray-400"
    >
      <ChatAlt2Icon className="w-5 h-5" />
      <span>{children}</span>
    </button>
  );
};

export default ReplyButton;
