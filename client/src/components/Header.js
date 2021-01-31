import { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Header = ({ title, logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Button variant='outline-dark' onClick={logout}>
      Déconnexion
    </Button>
  )

  const guestLinks = (
    <>
      <Link to='/entreprise/inscription'>
        <Button variant='outline-dark'>Inscription entreprise</Button>
      </Link>

      <Link to='/artiste/inscription'>
        <Button variant='outline-dark'>Inscription artistes</Button>
      </Link>

      <Link to='/connexion'>
        <Button variant='outline-primary'>Connexion</Button>
      </Link>
    </>
  )

  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand as={Link} to='/'>
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='app-nav' />
        <Navbar.Collapse id='app-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/'>
              Accueil
            </Nav.Link>
            <Nav.Link href='#'>À propos</Nav.Link>
            <Nav.Link href='#'>Contact</Nav.Link>
          </Nav>

          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  tilte: PropTypes.string,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Header)
