import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Welcome from '../Welcome.jsx';
import Fixture from '../__tests__/fixtures/Welcome.json';

const suite = new Suite();

suite.add('Welcome component rendering', () => {
    renderToString(<Welcome {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
