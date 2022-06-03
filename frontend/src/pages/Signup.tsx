import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { Formik, Form } from 'formik'
import TextInput from '../components/TextInput'
import Error from '../components/Error'
import * as Yup from 'yup'
import { LockClosedIcon } from '@heroicons/react/solid'
import { User } from '../types'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be 3 characters or more.')
    .required('Username is required.'),
  email: Yup.string().email('Invalid email.').required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required.'),
})

type FormValues = {
  username: string
  email: string
  password: string
}

const Signup = () => {
  const authContext = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true)
      setError('')
      const { data }: { data: User } = await axios.post('/api/signup', values)
      authContext.setAuthState(data)
      history.push('/')
    } catch (e: any) {
      setLoading(false)
      const { data } = e.response
      setError(data.message)
    }
  }

  const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
  }
  return (
    <main className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <section className='sm:max-w-md w-full space-y-8'>
        <h1 className='mt-6 text-center text-3xl font-bold'>Sign up</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={SignupSchema}
        >
          <Form className='mt-8 space-y-6'>
            <TextInput
              data-testid='username'
              label='Username'
              name='username'
              type='text'
            />
            <TextInput
              data-testid='email'
              label='Email'
              name='email'
              type='text'
            />
            <TextInput
              data-testid='password'
              label='Password'
              name='password'
              type='password'
            />
            <button
              data-testid='signup-btn'
              type='submit'
              disabled={loading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-2xl font-medium rounded-full text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockClosedIcon
                  className='h-8 w-8 text-blue-500 group-hover:text-blue-400'
                  aria-hidden='true'
                />
              </span>
              Sign up
            </button>
            {error && <Error error={error} />}
          </Form>
        </Formik>
        <p className='text-xs'>
          Already a Posterly member?{' '}
          <Link
            className='font-bold text-blue-500 hover:text-blue-400'
            to='/login'
          >
            LOG IN
          </Link>
          .
        </p>
      </section>
    </main>
  )
}

export default Signup
