/**
 * Summarizes the attributes of the given data by counting the unique values
 * and occurrences of each value.
 * E.g: An attribute 'Age' includes 2 unique values 'YOUTH' and 'SENIOR',
 * whereas, 'YOUTH' occurred 5 times.
 * @param data An array of objects.
 */
export const countUniqueValuesInAttributes = (data: {}[]): Map<string, Map<string, number>> => {
    const attributes = Object.keys(data[0]);
    const attributeMap = new Map<string, Map<string, number>>();
    
    data.forEach(element => {
        attributes.forEach(a => {
            let valueMap = attributeMap.get(a);
            if(!valueMap){
                valueMap = new Map<string, number>();
                attributeMap.set(a, valueMap);
            }

            let valCount = valueMap.get(element[a]);
            valCount = valCount ? valCount + 1: 1;
            valueMap.set(element[a], valCount);
        });
    });
    return attributeMap;
};

export type Attribute = {
    name: string;
    value: string;
}

/**
 * Groups and counts the occurrences of unique values that map to the given value of
 * the specified target attribute.
 * E.g 'YOUTH' value occurred 2 times while the attribute X had value S.
 * @param data 
 * @param target 
 */
export const groupValuesByTargetAttribute = (data: any[], target: Attribute): Map<string, Map<string, number>>  => {
    const attributeMap = new Map<string, Map<string, number>>();
    const attributes = Object.keys(data[0]);

    data.forEach((row) => {
        const criteriaValue = row[target.name];

        attributes.forEach((a) => {
            if(a === target.name){
                return;
            }
            let valueMap = attributeMap.get(a);
            if(!valueMap){
                valueMap = new Map<string, number>();
            }

            const atVal = row[a];
            let count = valueMap.get(atVal);

            if(criteriaValue === target.value){
                count = count ? count + 1 : 1;
            }

            valueMap.set(atVal, count);
            attributeMap.set(a, valueMap);
        });

    });
    return attributeMap;
};
