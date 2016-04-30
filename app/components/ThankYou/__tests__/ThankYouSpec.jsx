import React from 'react';
import ThankYou  from '../ThankYou.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('ThankYou', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<ThankYou />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
