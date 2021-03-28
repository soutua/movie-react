import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Button, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth, logout } from './authSlice'

const AuthNav = () => {
  const auth = useAppSelector(getAuth)
  const dispatch = useAppDispatch()

  if (auth) {
    return (
      <LinkContainer to="/">
        <Nav.Link
          active
          className="btn btn-secondary"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Nav.Link>
      </LinkContainer>
    )
  } else {
    return (
      <LinkContainer to="/login">
        <Nav.Link active className="btn btn-secondary">
          Login
        </Nav.Link>
      </LinkContainer>
    )
  }
}

export default AuthNav
