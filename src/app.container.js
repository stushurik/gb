import { connect } from 'react-redux'
import App from './app'

function mapStateToProps({ui}) {
  return {
    showUserDetails: ui.isUserDetailsVisible
  }

}

export default connect(mapStateToProps)(App);