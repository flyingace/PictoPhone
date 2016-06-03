import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import ColorPalette from '../ColorPalette.jsx';
import Fixture from '../__tests__/fixtures/ColorPalette.json';

const suite = new Suite();

suite.add('ColorPalette component rendering', () => {
    renderToString(<ColorPalette {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
