import Helpers from './Helpers.js';

describe('#Helpers', () => {

  describe('#stripBlanks', () => {
    const withBlanks = { title: "exists", subtitle: "" };
    const noBlanks = { title: "exists", subtitle: "exists too" };
    const nestedBlanks = {
      title: "exists",
      steps: [ { headline: "exists", description: "" } ]
    };

    it('should strip out blank strings and return the object', () => {
      let result = Helpers.stripBlanks(withBlanks);
      expect(result).toHaveProperty("title")
      expect(result).not.toHaveProperty("subtitle")
    });

    it('should return an object that has no blanks unchanged', () => {
      let result = Helpers.stripBlanks(noBlanks);
      expect(result).toHaveProperty("title")
      expect(result).toHaveProperty("subtitle")
    });

    it('should handle nested blank values just as well as top level blanks', () => {
      let result = Helpers.stripBlanks(nestedBlanks);
      expect(result).toHaveProperty("title")
      expect(result.steps[0]).not.toHaveProperty("description")
    });
  });
});