import {Attribute, groupValuesByTargetAttribute, countUniqueValuesInAttributes } from "./commons";

export const Gini = (props: {total: number, targetCatCount: number}): number => {
    return 1 - Math.pow(props.targetCatCount/props.total, 2) - Math.pow((props.total - props.targetCatCount)/props.total, 2);
}

type partitionSummary = {
    targetCatCount: number,
    total: number,
};

export const giniOfPartition = ({total, d1, d2}: {
    total: number,
    d1: partitionSummary,
    d2: partitionSummary,
}) => {
    const p1 = (d1.total/total) * Gini(d1);
    const p2 = (d2.total/total) * Gini(d2);
    return p1 + p2;
}

/**
 * Counts the unique Permutations, non-repeating and order doesn't matter.
 * E.g: select a pair of sets from a Power set, so that the pair contains all elements.
 * @param n Total count
 * @param r Selection
 */
export const countUniquePermutations = (n: number, r: number): number => {
    return Math.pow(r, n - 1) - 1;
}

export const generatePairSets = (arr: string[], count: number): {a0: string[], a1: string[]}[] => {
    const result = [];
    const pairsCount = countUniquePermutations(arr.length, count);

    for(let i = 1; i < pairsCount + 1; i++){
        let bin = (i).toString(2);
        while(bin.length < arr.length){ bin = '0' + bin;}
        
        const a0 = [];
        const a1 = [];

        for(let b = 0; b < bin.length; b++){
            if(bin[b] === '1'){
                a1.push(arr[b]);
            }else{
                a0.push(arr[b]);
            }
        }
        result.push({a0, a1});
    }
    return result;
}

const summarizePartition = (
    partitionKeys: string[],
    valMap: Map<string, number>,
    groupMap: Map<string, number>) => {
    let total = 0;
    let targetCatCount = 0;

    partitionKeys.forEach(k => {
        total += valMap.get(k);
        targetCatCount += groupMap.get(k);
    });
    return {total, targetCatCount};
}

export const giniOfDataSet = (arr: any[], criteria: Attribute) => {
    const uniques = countUniqueValuesInAttributes(arr);
    const groups = groupValuesByTargetAttribute(arr, criteria);
    const total = arr.length;
    const result = [];

    groups.forEach((group, attribute) => {
        const groupKeys = Array.from(group.keys());
        const groupPairs = generatePairSets(groupKeys, 2);

        let minGiniOfGroup = 1;
        let indexOfMinGini = -1;
        let partitions = undefined;

        groupPairs.forEach(({a0, a1}, i) => {
 
            const giniProps = {
                total,
                d1: summarizePartition(a0, uniques.get(attribute), group),
                d2: summarizePartition(a1, uniques.get(attribute), group)
            };
            
            const giniOfGroup = giniOfPartition(giniProps);

            if(giniOfGroup < minGiniOfGroup) {
                minGiniOfGroup = giniOfGroup;
                indexOfMinGini = i;
                partitions = {a0, a1};
            }
        });

        result.push({attribute, minGG: minGiniOfGroup, ...partitions});
    });

    return result;
}