import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ThankYou from '../components/ThankYou/ThankYou';
import * as ThankYouActions from '../actions/thankYou';

function mapStateToProps(state) {
    return {
        thankYou: state.thankYou
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ThankYouActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
