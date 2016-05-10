import React from 'react';
import Key  from '../Key.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Key', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Key />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
