import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PageTitle from '../layout/titles/PageTitle'

const ArtistDashboard = ({ children, auth: { user } }) => {
  return (
    <>
      <PageTitle>Tableau de bord - Artiste</PageTitle>

      <Row>
        <Col md='2'>Menu dashboard</Col>

        <Col md='10'>{children}</Col>
      </Row>
    </>
  )
}

ArtistDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(ArtistDashboard)
