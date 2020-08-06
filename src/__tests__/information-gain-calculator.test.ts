import {info_a, info, gain} from '../information-gain-calculator';
import { exampleData } from '../data/info-gain-data';

describe('info-gain-calculator', () => {
    describe('info_a (D)', () => {
        it('should calculate info gain of an attribute', () => {
            const youth = info_a({
                totalOccurrences: 5,
                contributionCount: 2,
                nonContributionProbability: 5/14,
            });
            expect(youth).toBe(0.3467680694480959);
        });
    });

    describe('info (D)', () => {
        it('should calculate info gain of whole data', () => {
            const result = info({
                totalOccurrences: 14,
                contributionCount: 9,
            });
            expect(result).toBe(0.9402859586706309);
        });

        it('should calculate info gain of given data', () => {
            const result = info({
                totalOccurrences: 100,
                contributionCount: 10,
            });
            expect(result).toBe(0.4689955935892812);
        });
    });

    describe('gain (D)', () => {
        it('should calculate gain of a given data', () => {
            const result = gain(exampleData, {name: 'buys_computer', value: 'T'});
            expect(result.get('age')).toBe(0.2467498197744391);
            expect(result.get('income')).toBe(0.029222565658954647);
            expect(result.get('student')).toBe(0.15183550136234136);
            expect(result.get('credit_rating')).toBe(0.04812703040826927);
        });

    });
});

