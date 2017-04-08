import Flowchart from '../src/flowchart';

import data from './data';

const flowchart = new Flowchart('#el');
flowchart.data(data).render();

console.log(flowchart);
