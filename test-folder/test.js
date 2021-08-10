const a = require('work-time-library')
var segments = [
    {
      name: 'Segment1LvlWorkingTime',
      description: '1 lvl segment for ordinary week days',
      status: true,
      validityStartDate: "2010-1-1",
      validityEndDate: "2050-1-1",
      segmentWorkingPeriods: {
        Monday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
        Tuesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
        Wednesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
        Thursday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
        Friday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],
        Saturday: null,
        Sunday: null
      },
      segmentLevel: 1
    },
    {
      name: 'Segment2LvlWorkingTime',
      description: '2 lvl segment for extra days',
      status: true,
      segmentWorkingPeriod: [["6:00:00","10:00:00"],["12:00:00","17:00:00"]],
      segmentLevel: 2,
      segmentValidatyDays: [
        "2021-8-12",
        "2021-8-16"
      ]
    },
    {
      name: 'Segment3Lvl',
      description: '3 lvl segment for holidays',
      status: true,
      segmentLevel: 3,
      segmentValidatyDays: [
        "2021-8-10",
        "2021-8-15"
      ]
    },
  ]
var validatyRange = [
    "2021-8-10",
    "2021-8-16"
  ]
var options = {
    format: 'Hours', //Seconds | Minutes | Hours
}
console.log(a(validatyRange, segments, options));
