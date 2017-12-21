import { compose } from "redux";
import { connect } from "react-redux";
import { resetUsers } from "./github.duck";
import App from "./app";

function mapStateToProps({ ui }) {
  return {
    isUserDetailsVisible: ui.isUserDetailsVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onReset: compose(dispatch, resetUsers)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
