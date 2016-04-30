import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import ThankYou from '../ThankYou.jsx';
import Fixture from '../__tests__/fixtures/ThankYou.json';

const suite = new Suite();

suite.add('ThankYou component rendering', () => {
    renderToString(<ThankYou {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
