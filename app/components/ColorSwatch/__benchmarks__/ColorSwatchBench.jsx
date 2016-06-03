import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import ColorSwatch from '../ColorSwatch.jsx';
import Fixture from '../__tests__/fixtures/ColorSwatch.json';

const suite = new Suite();

suite.add('ColorSwatch component rendering', () => {
    renderToString(<ColorSwatch {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
