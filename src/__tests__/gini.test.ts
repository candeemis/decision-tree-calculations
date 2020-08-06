import { Gini, giniOfDataSet, giniOfPartition, countUniquePermutations, generatePairSets } from '../gini';
import { exampleData } from '../data/info-gain-data';

describe('Gini', () => {
    it('should calculate Gini index of given data', () => {
        const result = Gini({
            total: 14,
            targetCatCount: 9
        });
    
        expect(result).toBe(0.4591836734693877);
    });

    describe('giniOfDataSet', () => {
        it('should compute gini of the whole dataset', () => {
            const result = giniOfDataSet(exampleData, {
                name: 'buys_computer',
                value: 'T'
            });
        });
    });

    it('should compute Gini of a partition pair', () => {
        const result = giniOfPartition({
            total: 14,
            d1: {
                total: 10,
                targetCatCount: 7,
            },
            d2: {
                total: 4,
                targetCatCount: 2
            },
        });
        expect(result).toBe(0.4428571428571429);
    });

    describe('countUniqueCombinations', () => {
                /** 3
                 * a, bc
                 * b, ac,
                 * bc, a
                 */

        /** 4
         * a, bcd,
         * ab, cd,
         * ac, bd,
         * ad, bc,
         * abc, d,
         * b, acd,
         * c, acd,
         */        

         /** 5
          * a, bcde, 4 + 4 + 3 + 2 + 1
          * e, abcd,
          * b, acde,
          * c, abde,
          * ab, cde,
          * ac, bde,
          * ad, bce,
          * ae, bcd,
          * bd, ace,
          * bc, ade,
          * be, acd,
          * de, abc,
          * cd, ade,
          * ce, abd,
          * de, abc,
          */
        const cases = [
            {n: 2, e: 1},
            {n: 3, e: 3},// 1 + 2
            {n: 4, e: 7},// 3 + 4
            {n: 5, e: 15},// 7 + 8
            {n: 6, e: 31},
        ]
        cases.forEach(({n, e}) => {
            it(`should return ${e} for n=${n} and r=2`, () => {
                const result = countUniquePermutations(n, 2);
                expect(result).toBe(e);
            });
        });
    });

    describe('generateCombinations', () => {
        it('should generate 7 unique pairs from array of 4', () => {
            const result = generatePairSets(['a','b', 'c', 'd'], 2);
            /**
             * a, bcd,
             * ab, cd,
             * ac, bd,
             * abc, d,
             * b, acd,
             * bc, ad,
             * c, abd,
             */
            expect(result.length).toBe(7);
        });

        it('should generate 3 unique pairs from array of 3', () => {
            const result = generatePairSets(['a','b', 'c'], 2);
            /**
             * a, bc,
             * ab, c,
             * b, ac,
             */
            expect(result.length).toBe(3);
        });

        it('should generate 1 unique pair from array of 2', () => {
            const result = generatePairSets(['a','b'], 2);
            /**
             * a, b,
             */
            expect(result.length).toBe(1);
        });

        it('should generate 15 unique pairs from array of 5', () => {
            const result = generatePairSets(['a','b', 'c', 'd', 'e'], 2);
            /**
             * a, bcde,
             * ab, cde,
             * abc, de,
             * abcd, e,
             * b, acde,
             * bc, ade,
             * bcd, ae,
             * cd, abe,
             * ce, abd,
             * de, abc,
             */
            expect(result.length).toBe(15);
        });

        it('should generate 31 unique pairs from array of 6', () => {
            const result = generatePairSets(['a','b', 'c', 'd', 'e', 'f'], 2);
          
            expect(result.length).toBe(31);
        });
    });
});
