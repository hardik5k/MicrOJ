const question = require('./routes/question.js')

test('Check is unique id is correctly generated', () => {
    expect(question.generateUniqueIdFromTitle('Rummle and rocks')).toContain("RAR");
});