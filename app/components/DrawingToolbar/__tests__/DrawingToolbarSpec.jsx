import React from 'react';
import DrawingToolbar  from '../DrawingToolbar.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('DrawingToolbar', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<DrawingToolbar />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
