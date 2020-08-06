import { countUniqueValuesInAttributes, groupValuesByTargetAttribute } from "../commons";
import { exampleData } from "../data/info-gain-data";

describe('countUniqueValuesInAttributes', () => {
    it('should calculate unique occurrences', () => {
        const result = countUniqueValuesInAttributes(exampleData);
        
        const age = result.get('age');
        expect(age).toBeDefined();
        expect(age.size).toBe(3);
        expect(age.get('YOUTH')).toBe(5);

        expect(result.get('income').size).toBe(3);
        expect(result.get('student').size).toBe(2);
        expect(result.get('credit_rating').size).toBe(2);
        expect(result.get('buys_computer').size).toBe(2);
    });
});

describe('groupValuesByTargetAttribute', () => {
    it('should calculate labels that contribute in classification', () => {
        const result = groupValuesByTargetAttribute(exampleData, {name: 'buys_computer', value: 'T'});
        
        const age = result.get('age');
        expect(age.size).toBe(3);
        expect(age.get('MIDDLE_AGED')).toBe(4);
        expect(age.get('YOUTH')).toBe(2);
        expect(age.get('SENIOR')).toBe(3);

        const income = result.get('income');
        expect(income.get('HIGH')).toBe(2);
        expect(income.get('MEDIUM')).toBe(4);
        expect(income.get('LOW')).toBe(3);

        const student = result.get('student');
        expect(student.get('YES')).toBe(6);
        expect(student.get('NO')).toBe(3);

        const credit = result.get('credit_rating');
        expect(credit.get('FAIR')).toBe(6);
        expect(credit.get('EXCELLENT')).toBe(3);
    });
});
