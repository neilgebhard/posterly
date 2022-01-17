import Flex from "./Flex";
import { TrashIcon } from "@heroicons/react/outline";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const DeleteButton = ({ children, ...rest }: Props) => {
  return (
    <Flex
      id="delete-btn"
      className="text-gray-400 hover:text-gray-500 cursor"
      role="button"
      {...rest}
    >
      <TrashIcon className="w-4 h-4" />
      <span>{children}</span>
    </Flex>
  );
};

export default DeleteButton;
