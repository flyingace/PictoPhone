import React from 'react';
import Keyboard  from '../Keyboard.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Keyboard', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Keyboard />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
