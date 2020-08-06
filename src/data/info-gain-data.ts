const newExampleRow = (age, income, student, credit_rating, buys_computer) => ({
    age, income, student, credit_rating, buys_computer
});

export const exampleData = [
    newExampleRow('YOUTH','HIGH','NO','FAIR','F'),
    newExampleRow('YOUTH','HIGH','NO','EXCELLENT','F'),
    newExampleRow('MIDDLE_AGED','HIGH','NO','FAIR','T'),
    newExampleRow('SENIOR','MEDIUM','NO','FAIR','T'),
    newExampleRow('SENIOR','LOW','YES','FAIR','T'),
    newExampleRow('SENIOR','LOW','YES','EXCELLENT','F'),
    newExampleRow('MIDDLE_AGED','LOW','YES','EXCELLENT','T'),
    newExampleRow('YOUTH','MEDIUM','NO','FAIR','F'),
    newExampleRow('YOUTH','LOW','YES','FAIR','T'),
    newExampleRow('SENIOR','MEDIUM','YES','FAIR','T'),
    newExampleRow('YOUTH','MEDIUM','YES','EXCELLENT','T'),
    newExampleRow('MIDDLE_AGED','MEDIUM','NO','EXCELLENT','T'),
    newExampleRow('MIDDLE_AGED','HIGH','YES','FAIR','T'),
    newExampleRow('SENIOR','MEDIUM','NO','EXCELLENT','F')
];
