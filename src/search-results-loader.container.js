import { connect } from 'react-redux';
import Loader from './loader';

function mapStateToProps({ github: { users: { searching } } }) {
  return {
    ready: !searching
  };
}

export default connect(mapStateToProps)(Loader);
