import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Welcome from '../components/Welcome/Welcome';
import * as WelcomeActions from '../actions/welcome';

function mapStateToProps(state) {
  return {
    counter: state.welcome
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WelcomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
