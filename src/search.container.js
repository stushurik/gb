import { compose } from 'redux'
import { connect } from 'react-redux';
import { searchUsers } from './github.duck';
import Search from './search';

function mapStateToProps({github: {users: {query}}}) {
  return { query }
}

function mapDispatchToProps(dispatch) {
  return {
    onQuerySubmit: compose(dispatch, searchUsers)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)