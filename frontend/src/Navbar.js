import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/Auth";
import axios from "axios";
import {
  BookmarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import Flex from "./ui/Flex";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const history = useHistory();
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();
  const { username } = authContext.auth;

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      authContext.logout();
      history.push("/");
    } catch (e) {
      const { data } = e.response;
      console.log(data);
    }
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-2 flex items-center justify-between h-16 text-xl font-medium">
        <Link to="/" className="flex items-center gap-x-0">
          <BookmarkIcon className="h-8 w-8" />
          Home
        </Link>
        <div className="flex align-middle space-x-4">
          {isAuthenticated ? (
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button>
                  <Flex className="hover:text-gray-600">
                    <UserCircleIcon className="h-6 w-6 inline" />
                    <span>{username}</span>
                    <ChevronDownIcon className="w-6 h-6" />
                  </Flex>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      // eslint-disable-next-line
                      <a
                        onClick={handleLogout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Link
                to="/login"
                id="login-link"
                className="border-indigo-600 border-2 px-4 py-1 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 px-4 py-1 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
