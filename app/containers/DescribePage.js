import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Describe from '../components/Describe/Describe';
import * as DescribeActions from '../actions/describe';

function mapStateToProps(state) {
    return {
        describe: state.describe
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DescribeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Describe);
