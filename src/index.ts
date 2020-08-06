import { gain } from './information-gain-calculator';
import { exampleData } from './data/info-gain-data';

const result = gain(exampleData, {key: 'buys_computer', value: 'T'});


exports = {
    result
}
