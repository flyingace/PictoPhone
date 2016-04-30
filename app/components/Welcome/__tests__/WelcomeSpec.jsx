import React from 'react';
import Welcome  from '../Welcome.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Welcome', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Welcome />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
