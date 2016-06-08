import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Toolbar from '../Toolbar.jsx';
import Fixture from '../__tests__/fixtures/Toolbar.json';

const suite = new Suite();

suite.add('Toolbar component rendering', () => {
    renderToString(<Toolbar {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
