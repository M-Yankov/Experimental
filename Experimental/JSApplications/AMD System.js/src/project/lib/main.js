import cssRules from './cssRules';
import $ from 'jquery';
import loaders from  './loadHTML';


cssRules.importStyle();

let state = 'dinamicly loaded';

console.log(`main loaded loaded ${state}`);

loaders.table();
// loaders.list();


