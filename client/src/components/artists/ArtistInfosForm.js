import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { DASHBOARD_ROUTE } from '../../routes'

import SectionTitle from '../layout/titles/SectionTitle'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const onSubmit = (e) => {
  e.preventDefault()
}

const ArtistInfosForm = () => {
  return (
    <>
      <SectionTitle>Mettre à jour mes informations personnelles</SectionTitle>

      <Form onSubmit={(e) => onSubmit(e)}>
        <Button variant='primary' type='submit'>
          Enregistrer
        </Button>

        <Link to={DASHBOARD_ROUTE}>
          <Button variant='warning'>Annuler</Button>
        </Link>
      </Form>
    </>
  )
}

ArtistInfosForm.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(ArtistInfosForm)
