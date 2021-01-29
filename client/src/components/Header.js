import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Header = ({ title }) => {
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

          <Link to='/artist/register'>
            <Button variant='outline-dark'>Inscription artistes</Button>
          </Link>

          <Link to='/login'>
            <Button variant='outline-primary'>Connexion</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  tilte: PropTypes.string,
}

export default Header
