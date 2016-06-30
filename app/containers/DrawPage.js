import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Draw from '../components/Draw/Draw';
import * as DrawActions from '../actions/draw';

function mapStateToProps(state) {
    return {
        draw: state.draw,
        //"description" is needed to complete the drawing page
        description: state.welcome.roundData.description,
        //these two values will be passed to the db,
        //along with the drawing URL once it has been completed
        currentPlayerID: state.welcome.currentPlayerID,
        currentDescription: state.describe.currentDescription
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DrawActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);
