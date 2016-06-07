import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import Modal from '../Modal.jsx';
import Fixture from '../__tests__/fixtures/Modal.json';

const suite = new Suite();

suite.add('Modal component rendering', () => {
    renderToString(<Modal {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
