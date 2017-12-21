import { connect } from 'react-redux';
import SearchResults from './search-results';

function mapStateToProps(state) {
  return {
    users: Object.values(state.users.results)
  }
}

export default connect(mapStateToProps)(SearchResults)