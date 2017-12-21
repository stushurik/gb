import { connect } from 'react-redux';
import UserDetails from './user-details';

function mapStateToProps(
  {github: {users: {fetchingFor, results: users}, repos: {results: reposByUsers}, issues: {results: issuesByRepos}}}
) {
  return {
    user: users[fetchingFor],
    repos: reposByUsers[fetchingFor] || [],
    issuesByRepos
  }
}

export default connect(mapStateToProps)(UserDetails)