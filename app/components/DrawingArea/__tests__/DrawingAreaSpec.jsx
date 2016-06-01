import React from 'react';
import DrawingArea  from '../DrawingArea.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('DrawingArea', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<DrawingArea />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
