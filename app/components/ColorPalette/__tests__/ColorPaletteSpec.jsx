import React from 'react';
import ColorPalette  from '../ColorPalette.jsx';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('ColorPalette', () => {

    let component, sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
        component = renderIntoDocument(<ColorPalette />);
    });

    after(() => {
        sandbox.restore();
    });

    it('should render', () => {
        expect(component).to.be.ok;
    });
});
