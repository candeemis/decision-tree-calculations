import { Attribute, countUniqueValuesInAttributes, groupValuesByTargetAttribute } from "./commons";

type infoProps = {
    totalOccurrences: number;
    contributionCount: number;
};

type infoAProps = {
    totalOccurrences: number;
    contributionCount: number;
    nonContributionProbability: number;
};

export const info_a = (props: infoAProps) => {
    return props.nonContributionProbability * info(props);
};

export const info = (props: infoProps) => {
    const contProb = props.contributionCount/props.totalOccurrences;
    const f1 = contProb * Math.log2(contProb);

    const nonContProb = (props.totalOccurrences - props.contributionCount)/props.totalOccurrences;
    let f2 = nonContProb * Math.log2(nonContProb);

    if(nonContProb === 0){
        return -f1;
    }
    return -(f1 + f2)
};

export const gain = (data: any[], targetAt: Attribute): Map<string, number> => {
    const distinct = countUniqueValuesInAttributes(data);
    const groups = groupValuesByTargetAttribute(data, targetAt);

    const totalRows = data.length;
    const totalTargetLabels = distinct.get(targetAt.name).get(targetAt.value);

    const totalInfo = info({
        totalOccurrences: totalRows,
        contributionCount: totalTargetLabels,
    });

    const results = new Map<string, number>();

    groups.forEach((group, attribute) => {
        
        let attInfo = 0;
        group.forEach((count, klass) => {
            const groupOccurrences = distinct.get(attribute).get(klass);
            const groupInfo = info_a({
                totalOccurrences: groupOccurrences,
                contributionCount: count,
                nonContributionProbability: groupOccurrences/totalRows
            });
            attInfo = attInfo + groupInfo;
        });

        const attGain = totalInfo - attInfo;
        results.set(attribute, attGain);
    });
    return results;
};
