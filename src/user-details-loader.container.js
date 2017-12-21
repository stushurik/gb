import { connect } from 'react-redux';
import Loader from './loader';

function mapStateToProps({ github: { users: { fetching } } }) {
  return {
    ready: !fetching
  };
}

export default connect(mapStateToProps)(Loader);
