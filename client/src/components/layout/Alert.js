import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Alert as BootstrapAlert } from 'react-bootstrap'
import { removeAlert } from '../../actions/alert'

const Alert = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <BootstrapAlert
      key={alert.id}
      variant={alert.alertType}
      onClose={() => removeAlert(alert.id)}
      dismissible
    >
      {alert.msg}
    </BootstrapAlert>
  ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, { removeAlert })(Alert)
