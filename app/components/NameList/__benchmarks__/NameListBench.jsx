import React from 'react';
import { renderToString } from 'react-dom/server';
import { Suite } from 'benchmark';
import benchmarks from 'beautify-benchmark';
import NameList from '../NameList.jsx';
import Fixture from '../__tests__/fixtures/NameList.json';

const suite = new Suite();

suite.add('NameList component rendering', () => {
    renderToString(<NameList {...Fixture} />);
}).on('start', () => {
    benchmarks.reset();
}).on('cycle', (event) => {
    benchmarks.add(event.target);
}).on('complete', () => {
    benchmarks.log();
}).run();
