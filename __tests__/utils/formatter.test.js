import { formatAsDate, formatAsCurrency } from "../../src/utils/formatter";

describe('test formatter', () => {
  test('should return correct formatted date', () => {
    expect(formatAsDate(new Date('2020-05-02'))).toBe('May, 2nd 2020');
  });

  test('should return null when the param is empty', () => {
    expect(formatAsDate()).toBe(null);
  });

  test('should return correct formatted currency', () => {
    const amount = 500;
    expect(formatAsCurrency(amount)).toBe(`$ ${amount}`);
  });

  test('should return null when the param is empty', () => {
    expect(formatAsCurrency()).toBe(null);
  });
});