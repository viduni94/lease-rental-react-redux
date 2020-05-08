export default {
  paymentFrequency: {
    WEEKLY: {
      name: 'weekly',
      weeks: 1,
      days: 7,
    },
    FORTNIGHTLY: {
      name: 'fortnightly',
      weeks: 2,
      days: 14,
    },
    MONTHLY: {
      name: 'monthly',
      weeks: 4,
      days: 28,
    },
  },
  // Day index is based on Sunday (0) to Saturday(6)
  paymentDays: {
    MONDAY: {
      name: 'monday',
      dayIndex: 1,
    },
    TUESDAY: {
      name: 'tuesday',
      dayIndex: 2,
    },
    WEDNESDAY: {
      name: 'wednesday',
      dayIndex: 3,
    },
    THURSDAY: {
      name: 'thursday',
      dayIndex: 4,
    },
    FRIDAY: {
      name: 'friday',
      dayIndex: 5,
    },
  },
  noOfDaysInAWeek: 7,
}