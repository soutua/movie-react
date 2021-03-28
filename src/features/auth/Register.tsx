import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getAuth, getRegisterError, register } from 'features/auth/authSlice'
import { FormEvent, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Redirect } from 'react-router'

const Register = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuth)
  const registerError = useAppSelector(getRegisterError)
  const [validated, setValidated] = useState(false)

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    setValidated(true)
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity()) {
      const target = event.target as typeof event.target & {
        username: { value: string }
        password: { value: string }
      }

      dispatch(
        register({
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
        validated={validated && !registerError}
        onSubmit={handleRegister}
      >
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter password" />
        </Form.Group>
        {registerError ? (
          <div className="alert alert-primary">
            {registerError === 'username_exists'
              ? 'Username already taken'
              : 'Registration failed'}
          </div>
        ) : null}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
