import React from 'react';
import Describe  from '../Describe.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('Describe', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<Describe />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
