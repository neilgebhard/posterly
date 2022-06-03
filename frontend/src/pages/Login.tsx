import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useAuth } from '../context/Auth'
import TextInput from '../components/TextInput'
import Error from '../components/Error'
import * as Yup from 'yup'
import { LockClosedIcon } from '@heroicons/react/solid'
import { User } from '../types'

type FormValues = {
  email: string
  password: string
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter an email.'),
  password: Yup.string().required('Enter a password.'),
})

const Login = () => {
  const authContext = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initialValues: FormValues = {
    email: '',
    password: '',
  }
  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true)
      setError('')
      const { data }: { data: User } = await axios.post('/api/login', values)
      authContext.setAuthState(data)
      history.push('/')
    } catch (e: any) {
      setLoading(false)
      const { data } = e.response
      setError(data.message)
    }
  }

  return (
    <main className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <section className='sm:max-w-md w-full space-y-8'>
        <h1 className='mt-6 text-center text-3xl font-bold'>Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={LoginSchema}
        >
          <Form className='mt-8 space-y-6'>
            <TextInput
              label='Email'
              data-testid='email'
              name='email'
              type='email'
            />
            <TextInput
              label='Password'
              data-testid='password'
              name='password'
              type='password'
            />
            <button
              data-testid='login-btn'
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
              Log In
            </button>
            {error && <Error error={error} />}
          </Form>
        </Formik>
        <p className='text-xs'>
          New to Posterly?{' '}
          <Link
            className='font-bold text-blue-500 hover:text-blue-400'
            to='/signup'
          >
            SIGN UP
          </Link>
          .
        </p>
      </section>
    </main>
  )
}

export default Login
