import React from 'react';
import Toolbar  from '../Toolbar.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Toolbar', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Toolbar />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
