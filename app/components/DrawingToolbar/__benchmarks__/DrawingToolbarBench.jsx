import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import DrawingToolbar from '../DrawingToolbar.jsx';
import Fixture from '../__tests__/fixtures/DrawingToolbar.json';

const suite = new Suite();

suite.add('DrawingToolbar component rendering', () => {
    renderToString(<DrawingToolbar {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
