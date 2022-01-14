import { ChatAlt2Icon } from "@heroicons/react/outline";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const ReplyButton = ({ children, ...rest }: Props) => {
  return (
    <button
      data-testid="reply-btn"
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
