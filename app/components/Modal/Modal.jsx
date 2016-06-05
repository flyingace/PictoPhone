import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Modal.scss';

/**
 * Modal class.
 * @class Modal
 * @augments React.Component
 */
const Modal = React.createClass(/** @lends Modal.prototype */{
    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Modal',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: PropTypes.node,
        isOpen: PropTypes.bool,
        onRequestClose: PropTypes.func,
        transitionName: PropTypes.string
    },

    getDefaultProps() {
        return {
            isOpen: false
        }
    },

    maybeRenderModal() {
        if (this.props.isOpen) {
            return (
                <ReactCSSTransitionGroup
                    transitionName={this.props.transitionName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    <div className='modal'>
                        {this.props.children}
                        <span onClick={this.props.onRequestClose} className='close' />
                    </div>
                </ReactCSSTransitionGroup>
            );
        } else {
            return <ReactCSSTransitionGroup
                transitionName={this.props.transitionName}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300} />;
        }
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div>
                {this.maybeRenderModal()}
            </div>
        );
    }
});

export default Modal;
