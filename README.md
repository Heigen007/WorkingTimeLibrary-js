# Work-time-library
Work-time-library is plugin to count business time.
## Instalation
---
### With NPM
```
npm i work-time-library
```
## Usage
---
```
import FindWorkingPeriodAdd from 'work-time-library/FindWorkingTimeAdd'
import FindWorkingPeriodDiff from 'work-time-library/FindWorkingTimeDiff'

//or
const FindWorkingPeriodAdd = require('work-time-library/FindWorkingTimeAdd')
const FindWorkingPeriodDiff = require('work-time-library/FindWorkingTimeDiff')
```
## Setup for FindWorkingPeriodDiff() function
---
You should put 3 params in function to get the result.
They are:
- ValidatyRange array(startDate and endDate).
- Time segments array.
- FunctionOptions, where you can define the time format output, that you want(hours,minutes or seconds).

### Setting validatyRange

```
// Create your validatyRange array as string array

var validatyRange = [
    "2021-8-10", // 10 August, 2021
    "2021-8-16" // 16 August, 2021
],
```
### Setting time segments
There are 3 types of time segments: , 
- Segment for ordinary week days.  
    // only one
- Segments for extra days(for example if you want to make to change period of working time for 7 of May).  
    // as many as you want
- Segment for holidays.  
    // only one

You should put all your segments to Segment array
```
// Segment for ordinary week days structure:

{
    name: 'Segment1LvlWorkingTime',

    description: '1 lvl segment for ordinary week days',

    status: true, // if status == false, segment wont be available

    validityStartDate: "2010-1-1", 
        // days from validatyRange array will be counted only within this two dates
    validityEndDate: "2050-1-1", 

    segmentWorkingPeriods: {

        Monday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]], // You can define as many periods as you want

        Tuesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],

        Wednesday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],

        Thursday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],

        Friday: [["7:00:00","10:00:00"],["11:00:00","18:00:00"]],

        Saturday: null, 
            // If you want to make holiday, enter "null"

        Sunday: null
    },
    segmentLevel: 1 // !
}
```
```
// Segment for extra days:

{
    name: 'Segment2LvlWorkingTime',

    description: '2 lvl segment for extra days',

    status: true,

    segmentWorkingPeriod: [["6:00:00","10:00:00"],["12:00:00","17:00:00"]],

    segmentValidatyDays: [ 
        "2021-8-12",
        "2021-8-16"
    ]
    // Here you should define the dates, when that schedule will be available

    segmentLevel: 2 // !
}
```
```
// Segment for holidays:

{
    name: 'Segment3Lvl',

    description: '3 lvl segment for holidays',

    status: true,

    segmentValidatyDays: [
        "2021-8-10", // 10 August, 2021
        "2021-8-15" // 15 August, 2021
    ]

    segmentLevel: 3
        // ! 
},
```
### Setting FunctionOptions

```
var FunctionOptions = {
    format: 'Seconds', //Seconds | Minutes | Hours
}
```

## Final usage of FindWorkingPeriodDiff() function:

```
var result = FindWorkingPeriodDiff(ValidatyRange, Segments, FunctionOptions)
```

==========================================================


## Setup for FindWorkingPeriodAdd() function
---
You should put 3 params in function to get the result.
They are:
- StartDate.
- Time segments array.
- AdditionalSecs.

### Setting StartDate

```
// Create your StartDate as ISO string

var StartDate = "2021-08-10T16:00:00"
```
### Setting time segments
```
Set time segments exactly like in FindWorkingPeriodDiff() fuction
You can find options above
```
### Setting AdditionalSecs

```
var AdditionalSecs = '3600' or 3600 // 3600 secs - 1 hour
```

## Final usage of FindWorkingPeriodAdd() function:

```
var result = FindWorkingPeriodAdd(ValidatyRange, Segments, FunctionOptions)
```