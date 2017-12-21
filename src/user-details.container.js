import { connect } from 'react-redux';
import UserDetails from './user-details';

function mapStateToProps({github: {users: {fetchingFor, results: users}, repos: {results: reposByUsers}}}) {
  return {
    user: users[fetchingFor],
    repos: reposByUsers[fetchingFor] || []
  }
}

export default connect(mapStateToProps)(UserDetails)