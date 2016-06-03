import React from 'react';
import ToolButton  from '../ToolButton.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('ToolButton', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<ToolButton />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
