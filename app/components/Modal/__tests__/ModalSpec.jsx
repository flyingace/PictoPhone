import React from 'react';
import Modal  from '../Modal.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Modal', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Modal />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
