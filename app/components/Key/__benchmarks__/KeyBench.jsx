import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Key from '../Key.jsx';
import Fixture from '../__tests__/fixtures/Key.json';

const suite = new Suite();

suite.add('Key component rendering', () => {
    renderToString(<Key {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
