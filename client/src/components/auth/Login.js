// Login will be same page for both artist and enterprises
// Backend will determine which is who

import { useState } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'

import Button from 'react-bootstrap/Button'

import PageTitle from '../layout/titles/PageTitle'

import { login, googleLogin } from '../../actions/auth'

import { DASHBOARD_ROUTE } from '../../routes'

const Login = ({ login, isAuthenticated, googleLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    login({ email, password })
  }

  const onGoogleBtnClick = () => {
    googleLogin()
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to={DASHBOARD_ROUTE} />
  }

  return (
    <div>
      <PageTitle>Vous identifier</PageTitle>

      <Row>
        <Col md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId='form-email'>
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Votre adresse email'
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
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Connexion
            </Button>
          </Form>

          <Button variant='outline-dark' onClick={() => onGoogleBtnClick()}>
            Se connecter avec Google
          </Button>
        </Col>
      </Row>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login, googleLogin })(Login)
