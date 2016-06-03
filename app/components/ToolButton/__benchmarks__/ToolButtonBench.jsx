import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import ToolButton from '../ToolButton.jsx';
import Fixture from '../__tests__/fixtures/ToolButton.json';

const suite = new Suite();

suite.add('ToolButton component rendering', () => {
    renderToString(<ToolButton {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
