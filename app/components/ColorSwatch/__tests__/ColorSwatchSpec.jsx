import React from 'react';
import ColorSwatch  from '../ColorSwatch.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('ColorSwatch', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<ColorSwatch />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
