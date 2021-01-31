import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageTitle from '../layout/titles/PageTitle'

const displayUserType = (user) => {
  if (user) {
    if (user.type === 'Artist') {
      return <p>Artiste : {user.email}</p>
    } else if (user.type === 'Enterprise') {
      return <p>Entreprise : {user.email}</p>
    }
  }
}

const Dashboard = ({ auth: { user } }) => {
  return (
    <>
      <PageTitle>Tableau de bord</PageTitle>
      {displayUserType(user)}
    </>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(Dashboard)
