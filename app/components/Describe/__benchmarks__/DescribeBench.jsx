import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Describe from '../Describe.jsx';
import Fixture from '../__tests__/fixtures/Describe.json';

const suite = new Suite();

suite.add('Describe component rendering', () => {
    renderToString(<Describe {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
