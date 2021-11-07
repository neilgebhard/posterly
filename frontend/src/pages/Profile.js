import { useAuth } from "../context/Auth";
import { MailIcon, UserCircleIcon } from "@heroicons/react/solid";

const Profile = () => {
  const authContext = useAuth();
  const { username, email } = authContext.auth;
  return (
    <main className="bg-white p-5 text-2xl font-semibold space-y-2">
      <h1 className="mb-5">Profile</h1>
      <div className="flex items-center gap-x-2">
        <UserCircleIcon className="h-7 w-7" />
        <span>{username}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <MailIcon className="h-7 w-7" />
        <span>{email}</span>
      </div>
    </main>
  );
};

export default Profile;
