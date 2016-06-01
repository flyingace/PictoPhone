import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import DrawingArea from '../DrawingArea.jsx';
import Fixture from '../__tests__/fixtures/DrawingArea.json';

const suite = new Suite();

suite.add('DrawingArea component rendering', () => {
    renderToString(<DrawingArea {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
