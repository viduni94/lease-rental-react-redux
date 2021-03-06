import format from 'date-fns/format'

/**
 * Converts a given date object to the following
 * date format.
 * eg: August, 12th 2020
 */
export const formatAsDate = (date) => {
  if (!date) return null;
  return format(date, 'LLLL, do yyyy');
}

/**
 * Converts a given number to the following
 * currency format
 * eg: $ 500
 */
export const formatAsCurrency = (amount) => {
  if (!amount) return null;
  return `$ ${amount}`;
}