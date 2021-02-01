import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageTitle from './titles/PageTitle'

import ArtistDashboard from '../dashboard/ArtistDashboard'
import EnterpriseDashboard from '../dashboard/EnterpriseDashboard'

const displayDashboard = (user, children) => {
  if (user) {
    if (user.type === 'Artist') {
      return <ArtistDashboard>{children}</ArtistDashboard>
    } else if (user.type === 'Enterprise') {
      return <EnterpriseDashboard>{children}</EnterpriseDashboard>
    }
  }
}

const DashboardLayout = ({ children, auth: { user } }) => {
  return <>{displayDashboard(user, children)}</>
}

DashboardLayout.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(DashboardLayout)
