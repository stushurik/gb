import { connect } from "react-redux";
import { resetUsers } from "./github.duck";
import { hideUserDetails } from './ui.duck';
import App from "./app";

function mapStateToProps({ github: {users, repos, issues}, ui }) {
  return {
    isUserDetailsVisible: ui.isUserDetailsVisible,
    hasApiErrors: users.error || repos.error || issues.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onReset: () => {
      dispatch(hideUserDetails());
      dispatch(resetUsers());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
