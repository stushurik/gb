import { connect } from 'react-redux'
import App from './app'

function mapStateToProps({ui}) {
  return {
    isUserDetailsVisible: ui.isUserDetailsVisible
  }

}

export default connect(mapStateToProps)(App);