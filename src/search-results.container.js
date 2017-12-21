import { connect } from 'react-redux';
import { showUserDetails } from './ui.duck'
import { getUser, getRepos } from './github.duck';
import SearchResults from './search-results';

function mapStateToProps({github: {users: {results}}}) {
  return {
    users: Object.values(results)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserSelect: (login) => {
      dispatch(getUser(login));
      dispatch(getRepos(login));
      dispatch(showUserDetails());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)