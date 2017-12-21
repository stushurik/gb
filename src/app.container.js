import { connect } from "react-redux";
import { resetUsers } from "./github.duck";
import { hideUserDetails } from './ui.duck';
import App from "./app";

function mapStateToProps({ ui }) {
  return {
    isUserDetailsVisible: ui.isUserDetailsVisible
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
