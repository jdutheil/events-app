import { useState } from 'react'
import PropTypes from 'prop-types'

import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setAlert, emptyAlert } from '../../actions/alert'
import { artistRegister } from '../../actions/auth'

import PageTitle from '../layout/titles/PageTitle'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ArtistRegister = ({
  setAlert,
  emptyAlert,
  artistRegister,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  })

  const { email, password, passwordCheck } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    emptyAlert()

    if (password !== passwordCheck) {
      setAlert('Les mots de passe ne sont pas identiques', 'danger')
    } else {
      artistRegister({ email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div>
      <PageTitle>Vous inscrire en tant qu'artiste</PageTitle>

      <Row>
        <Col md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId='form-email'>
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Votre adresse email (doit être valide)'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group controlId='form-password'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                required
                minlenght='8'
              />
              <Form.Text muted>8 caractères minimum</Form.Text>
            </Form.Group>

            <Form.Group controlId='form-password-check'>
              <Form.Label>Mot de passe (confirmation)</Form.Label>
              <Form.Control
                type='password'
                name='passwordCheck'
                value={passwordCheck}
                onChange={(e) => onChange(e)}
                required
                minlenght='8'
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Inscription
            </Button>
          </Form>

          <Form.Text muted>
            Vous êtes déjà inscrit sur notre plateforme ?{' '}
            <Link to='/login'>Connexion</Link>
          </Form.Text>
        </Col>
      </Row>
    </div>
  )
}

ArtistRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  emptyAlert: PropTypes.func.isRequired,
  artistRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {
  setAlert,
  emptyAlert,
  artistRegister,
})(ArtistRegister)
