const { Cron } = require('croner');
const {checkHolidays} = require('./checkHolidays');
const {checkAsistencia} = require('./checkAsistencia');
const {deletePastShifts} = require('./deletePastShifts');
const {shifts} = require('../config/config');
const {clearHoursAndHolidays} = require('./clearHoursAndHolidays');

//Check holidays every day at 07:00, check if one start or end today
Cron('0 7 * * *', () => checkHolidays());

// Run after the first hour every shift, get the shifts programmatically:
const startShifts = Object.values(shifts).map(shift => shift.start);
const startShiftsNumbers = startShifts.map(shift => shift.split(':')[0]);

startShiftsNumbers.forEach(shiftStartHour => {
    // Schedule a job for 30 minutes after the start of each shift
    Cron(`30 ${shiftStartHour} * * *`, () => checkAsistencia());
  }
);

// Run once a day at 07:00 ahd deletePastShifts
Cron('0 7 * * *', () => deletePastShifts());

// Run once a year, the 1st of january at 07:00
Cron('0 7 1 1 *', () => clearHoursAndHolidays());




