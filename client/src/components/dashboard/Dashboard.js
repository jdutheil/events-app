import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SectionTitle from '../layout/titles/SectionTitle'

import ArtistDashboardIndex from '../dashboard/ArtistDashboardIndex'

const displayIndex = (user) => {
  if (user.type === 'Artist') {
    return <ArtistDashboardIndex />
  } else if (user.type === 'Enterprise') {
    return <p>EnterpriseDashboardIndex à créer</p>
  }
}

const Dashboard = ({ auth: { user } }) => {
  return <>{displayIndex(user)}</>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(Dashboard)
