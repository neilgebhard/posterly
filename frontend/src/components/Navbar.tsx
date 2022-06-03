import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import axios from 'axios'
import {
  UserCircleIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
import Flex from './Flex'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const history = useHistory()
  const authContext = useAuth()
  const isAuthenticated = authContext.isAuthenticated()
  const { username } = authContext.auth

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout')
      authContext.logout()
      history.push('/')
    } catch (e: any) {
      const { data } = e.response
      console.log(data)
    }
  }

  return (
    <nav className='bg-white'>
      <div className='max-w-7xl mx-auto px-2 flex items-center justify-between py-2 text-xl font-medium'>
        <Link
          data-testid='home-link'
          to='/'
          className='flex items-center gap-x-0'
        >
          <h1 className='text-xl mb-0'>
            <span className='text-orange'>Post</span>erly
          </h1>
        </Link>
        <div className='flex align-middle space-x-4'>
          {isAuthenticated ? (
            <Menu data-testid='profile-menu' as='div' className='ml-3 relative'>
              <div>
                <Menu.Button>
                  <Flex className='hover:text-gray-600'>
                    <UserCircleIcon className='h-6 w-6 inline' />
                    <span>{username}</span>
                    <ChevronDownIcon className='w-6 h-6' />
                  </Flex>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        data-testid='profile-link'
                        to='/profile'
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
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
                        data-testid='logout-link'
                        role='button'
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        )}
                      >
                        Log out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Flex>
                <Link
                  data-testid='login-link'
                  to='/login'
                  className='text-base border-blue-600 text-blue-600 border-2 px-10 py-1 rounded-full'
                >
                  Log In
                </Link>
              </Flex>
              <Flex>
                <Link
                  data-testid='signup-link'
                  to='/signup'
                  className='text-white text-base hover:text-white bg-blue-600 hover:bg-blue-500 active:bg-indigo-400 px-10 py-1 rounded-full'
                >
                  Sign Up
                </Link>
              </Flex>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
