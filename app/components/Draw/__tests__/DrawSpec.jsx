import React from 'react';
import Draw  from '../Draw.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Draw', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Draw />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
