import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Keyboard from '../Keyboard.jsx';
import Fixture from '../__tests__/fixtures/Keyboard.json';

const suite = new Suite();

suite.add('Keyboard component rendering', () => {
    renderToString(<Keyboard {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
