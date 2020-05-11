import { calculateRentalCycles, getFirstPaymentDate } from '../../src/utils/paymentCalculator';
import {formatAsCurrency, formatAsDate} from "../../src/utils/formatter";

describe('test payment calculator', () => {
  test('should return correct formatted date', () => {
    const leaseInfo = {
      end_date: "2018-07-15",
      frequency: "monthly",
      id: "lease-a",
      payment_day: "friday",
      rent: 820,
      start_date: "2018-02-15",
    };
    const result = [
      {
        amount: "117.1",
        end: "February, 15th 2018",
        noOfDays: 1,
        start: "February, 15th 2018",
      },
      {
        amount: 3280,
        end: "March, 15th 2018",
        noOfDays: 28,
        start: "February, 16th 2018",
      },
      {
        amount: 3280,
        end: "April, 12th 2018",
        noOfDays: 28,
        start: "March, 16th 2018",
      },
      {
        amount: 3280,
        end: "May, 10th 2018",
        noOfDays: 28,
        start: "April, 13th 2018",
      },
      {
        amount: 3280,
        end: "June, 7th 2018",
        noOfDays: 28,
        start: "May, 11th 2018",
      },
      {
        amount: 3280,
        end: "July, 5th 2018",
        noOfDays: 28,
        start: "June, 8th 2018",
      },
      {
        amount: "1171.4",
        end: "July, 15th 2018",
        noOfDays: 10,
        start: "July, 6th 2018",
      },
    ];
    expect(calculateRentalCycles(leaseInfo)).toEqual(result);
  });

  test('should return null if the param is empty', () => {
    expect(calculateRentalCycles()).toEqual(null);
  });

  test('should return the correct first payment date', () => {
    const startDate = new Date('2020-05-11');
    const result = new Date('2020-05-14');
    const paymentDay = 'friday';
    expect(getFirstPaymentDate(startDate, paymentDay)).toEqual(result);
  });
});