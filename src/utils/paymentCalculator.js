import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import isBefore from 'date-fns/isBefore'
import addWeeks from 'date-fns/addWeeks'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import constants from './constants';
import { formatAsDate } from './formatter';

const { paymentFrequency, paymentDays, noOfDaysInAWeek } = constants;

/**
 * Calculates and returns the first payment of the lease.
 * This date is the last date of the first payment cycle.
 */
const getFirstPaymentDate = (date, paymentDay) => {
  const paymentDate = new Date(date);
  const { dayIndex } = (paymentDay && paymentDays[paymentDay.toUpperCase()]) || 1; // Defaults to monday

  paymentDate.setDate(paymentDate.getDate() + (dayIndex - 1 - paymentDate.getDay() + 7) % 7);
  return paymentDate;
}

/**
 * Get the no. of days between two dates
 */
const calculateNoOfDaysBetweenTwoDates = (start, end) => differenceInCalendarDays(end, start) + 1;

/**
 * Calculates the payment cycles between two given dates
 * and returns an array of the from, to dates of the cycle,
 * the no. of days in the cycle and the amount to be paid
 * for the particular cycle.
 */
const calculateRentalCycles = (leaseInfo) => {  
  const {
    end_date,
    start_date,
    frequency,
    payment_day,
    rent,
  } = leaseInfo || {};

  let paymentCyclesArray = [];
  const startDate = new Date(new Date(start_date).setHours(0,0,0,0));
  const endDate = new Date(new Date(end_date).setHours(0,0,0,0));
  
  const firstPaymentDate = getFirstPaymentDate(startDate, payment_day);
  const noOfDaysInFirstCycle = calculateNoOfDaysBetweenTwoDates(startDate, firstPaymentDate);

  const firstPaymentCycle = {
    start: formatAsDate(startDate),
    end: formatAsDate(firstPaymentDate),
    noOfDays: noOfDaysInFirstCycle,
    amount: (rent / noOfDaysInAWeek * noOfDaysInFirstCycle).toFixed(1),
  };
  // Append the first payment cycle to the payments array
  paymentCyclesArray.push(firstPaymentCycle);

  let fromDate = addDays(firstPaymentDate, 1);

  while(isBefore(fromDate, endDate)) {
    const toDate = subDays(
      addWeeks(fromDate, (paymentFrequency[frequency.toUpperCase()].weeks)), 1
    );

    let cycle;
    // Calculate the cycles between the first and last cycles
    if (isBefore(toDate, endDate)) {
      cycle = {
        start: formatAsDate(fromDate),
        end: formatAsDate(toDate),
        noOfDays: paymentFrequency[frequency.toUpperCase()].days,
        amount: rent * paymentFrequency[frequency.toUpperCase()].weeks,
      };
    // Calculate the last cycle
    } else {
      const noOfDaysInLastCycle = calculateNoOfDaysBetweenTwoDates(fromDate, endDate);
      cycle = {
        start: formatAsDate(fromDate),
        end: formatAsDate(endDate),
        noOfDays: noOfDaysInLastCycle,
        amount: (rent / noOfDaysInAWeek * noOfDaysInLastCycle).toFixed(1),
      };
    }
    paymentCyclesArray.push(cycle);
    fromDate = addDays(toDate, 1);
  }
  return paymentCyclesArray;
}

export default calculateRentalCycles;
