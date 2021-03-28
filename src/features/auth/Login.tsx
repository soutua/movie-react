import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getAuth, getLoginError, login } from 'features/auth/authSlice'
import { FormEvent, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuth)
  const loginError = useAppSelector(getLoginError)
  const [validated, setValidated] = useState(false)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    setValidated(true)
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity()) {
      const target = event.target as typeof event.target & {
        username: { value: string }
        password: { value: string }
      }

      dispatch(
        login({
          username: target.username.value,
          password: target.password.value,
        })
      )
    }
  }

  return (
    <Container className="p-4 d-flex justify-content-center">
      {auth && <Redirect to="/" />}
      <Form
        className="auth-form"
        noValidate
        validated={validated && !loginError}
        onSubmit={handleLogin}
      >
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter password" />
        </Form.Group>
        {loginError ? (
          <div className="alert alert-primary">Login failed</div>
        ) : null}
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Link className="ml-3" to="/register">
          Or create new account
        </Link>
      </Form>
    </Container>
  )
}

export default Login
