export default () => {
  /**
   * Run all tests within availableTest with keys `title` and `test`
   *
   * Hint: To skip a test, comment out the `title` key
   *
   * @param {Object} availableTests
   */
  const runTests = (availableTests) => {
    Object.values(availableTests)
      .forEach((availableTest) => {
        if (availableTest?.title && availableTest?.test) {
          it(availableTest.title, availableTest.test)
        }
      })
  }

  return {
    runTests,
  }
}