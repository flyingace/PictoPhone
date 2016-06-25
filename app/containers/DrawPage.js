import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Draw from '../components/Draw/Draw';
import * as DrawActions from '../actions/draw';

function mapStateToProps(state) {
    return {
        draw: state.draw
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DrawActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);
