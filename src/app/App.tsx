import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loadAuth } from 'features/auth/authSlice'
import { loadConfig } from 'features/config/configSlice'
import { selectConfig } from 'features/config/configSlice'
import Search from 'features/search/Search'
import Login from 'features/auth/Login'
import Register from 'features/auth/Register'
import AuthNav from 'features/auth/AuthNav'
import Details from 'features/details/Details'
import Favorites from 'features/favorites/Favorites'
import Category from 'features/category/Category'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadAuth())
    dispatch(loadConfig())
  }, [])

  const config = useAppSelector(selectConfig)

  if (config) {
    return (
      <div>
        <Router>
          <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/">Movies</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="mr-auto" defaultActiveKey="/">
                <LinkContainer exact to="/">
                  <Nav.Link>Popular</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/search">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/favorites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <AuthNav />
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/movie/:movieId">
              <Details />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Category category="popular" />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default App
