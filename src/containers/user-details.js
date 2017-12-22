import { connect } from 'react-redux';
import { UserDetails } from '../components';

function mapStateToProps({
  github: {
    users: { fetchingFor, results: users },
    repos: { results: reposByUsers },
    issues: { results: issuesByRepos }
  }
}) {
  return {
    user: users[fetchingFor],
    repos: reposByUsers[fetchingFor] || [],
    issuesByRepos
  };
}

export default connect(mapStateToProps)(UserDetails);
