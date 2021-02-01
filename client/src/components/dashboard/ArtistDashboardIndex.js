import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { ARTIST_UPDATE_INFOS_ROUTE } from '../../routes'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import SectionTitle from '../layout/titles/SectionTitle'

// Display personal informations or anonymous
const displayInfos = (user) => {
  if (user) {
    if (user.isAnonymous === true) {
      return (
        <>
          <p>
            Vous êtes anonyme pour l'instant ; merci de renseigner vos
            informations personnelles afin de pouvoir utiliser la plateforme.
          </p>

          <Link to={ARTIST_UPDATE_INFOS_ROUTE}>
            <Button variant='primary'>Renseigner mes infos</Button>
          </Link>
        </>
      )
    }

    return <>Affichage des infos</>
  }
}

const ArtistDashboardIndex = ({ auth: { user } }) => {
  return (
    <>
      <Row>
        <Col md='7'>
          <SectionTitle>Mes informations</SectionTitle>

          {displayInfos(user)}
        </Col>

        <Col md='3'>
          <SectionTitle>Mes profils</SectionTitle>
        </Col>
      </Row>
    </>
  )
}

ArtistDashboardIndex.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(ArtistDashboardIndex)
