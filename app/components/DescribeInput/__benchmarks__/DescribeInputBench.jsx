import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import DescribeInput from '../DescribeInput.jsx';
import Fixture from '../__tests__/fixtures/DescribeInput.json';

const suite = new Suite();

suite.add('DescribeInput component rendering', () => {
    renderToString(<DescribeInput {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
