const question = require('./routes/question.js')

test('Check is unique id is correctly generated', () => {
    expect(question.generateUniqueIdFromTitle('Rummle and rocks')).toContain("RAR");
});


test('Check if a valid test case ID returns the correct test case', () => {
    const testCaseId = 1;
    const testCase = question.getTestCase(testCaseId);
  
    expect(testCase).toEqual({
      input: 'inp1',
      expectedOutput: '1 1',
    });
  });
  
  test('Check if an invalid test case ID returns null', () => {
    const testCaseId = 999; // Assuming this id does not exist
    const testCase = question.getTestCase(testCaseId);
  
    expect(testCase).toBeNull();
  });
