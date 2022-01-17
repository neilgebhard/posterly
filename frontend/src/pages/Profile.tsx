import { useAuth } from "../context/Auth";
import { MailIcon, UserCircleIcon } from "@heroicons/react/solid";
import Flex from "../components/Flex";

const Profile = () => {
  const { username, email } = useAuth().auth;

  return (
    <main className="bg-white p-5 text-2xl font-semibold space-y-2">
      <h1 className="mb-5">Profile</h1>
      <Flex className="gap-x-2">
        <UserCircleIcon className="h-7 w-7" />
        <span>{username}</span>
      </Flex>
      <Flex className="gap-x-2">
        <MailIcon className="h-7 w-7" />
        <span>{email}</span>
      </Flex>
    </main>
  );
};

export default Profile;
