import React from 'react';
import DescribeInput  from '../DescribeInput.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('DescribeInput', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<DescribeInput />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
