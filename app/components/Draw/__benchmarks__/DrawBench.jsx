import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Draw from '../Draw.jsx';
import Fixture from '../__tests__/fixtures/Draw.json';

const suite = new Suite();

suite.add('Draw component rendering', () => {
    renderToString(<Draw {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
