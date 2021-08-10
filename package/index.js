var startingDate = null;
var endingDate = null;
var segmentsFLevel = null;
var segmentsSLevel = null;
var segmentsTLevel = null;
var accumulator = 0;
var currentDate = null;

function FindWorkingPeriod(validatyRange, InnerSegments, options) {
    // Filling variables
    startingDate = new Date(validatyRange[0])
    currentDate = new Date(validatyRange[0])
    endingDate = new Date(validatyRange[1])
    segmentsFLevel = InnerSegments.filter(el => el.segmentLevel == 1 && el.status)
    segmentsSLevel = InnerSegments.filter(el => el.segmentLevel == 2 && el.status)
    segmentsTLevel = InnerSegments.filter(el => el.segmentLevel == 3 && el.status)

    //Counting time of each day and accumulating the result

    for (let index = 0; index <= (endingDate - startingDate) / (1000 * 3600 * 24); index++) {
        calcDayTime()
    }

    if (options && options.format) {
        switch (options.format) {
            case "Seconds": return accumulator;
            case "Minutes": return Math.round((accumulator/60) * 100) / 100
            case "Hours": return Math.round((accumulator/(3600)) * 100) / 100
            default: return accumulator;
        }
    }
    return accumulator
}

function calcDayTime() {
    // Filling variables
    var FunctionCurrentDate = {}
    var segmentsFLevelCopy = JSON.parse(JSON.stringify(segmentsFLevel))
    var segmentsSLevelCopy = JSON.parse(JSON.stringify(segmentsSLevel))
    var segmentsTLevelCopy = JSON.parse(JSON.stringify(segmentsTLevel))
    var FunctionDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(currentDate)
    //First level segment iteration

    segmentsFLevelCopy.forEach(element => {
        if(CheckFLevelDay(element, FunctionDayOfWeek)) {
            FunctionCurrentDate.segmentWorkingPeriods = element.segmentWorkingPeriods[FunctionDayOfWeek]
        } else {
            FunctionCurrentDate.segmentWorkingPeriods = null
        }
    });

    //Second level segment iteration

    segmentsSLevelCopy.forEach(element => {
        if(CheckSLevelDay(element)) FunctionCurrentDate.segmentWorkingPeriods = element.segmentWorkingPeriod
    });

    //Third level segment iteration

    segmentsTLevelCopy.forEach(element => {
        if(CheckSLevelDay(element)) {
            FunctionCurrentDate.segmentWorkingPeriods = null
        }
    });

    accumulator += accumulateDayTime(FunctionCurrentDate)

    currentDate.setDate(currentDate.getDate() + 1)
}

function CheckFLevelDay(element, FunctionDayOfWeek) {
    if( element.segmentWorkingPeriods[FunctionDayOfWeek] != null
        && element.status
        && new Date(element.validityStartDate) < currentDate
        && new Date(element.validityEndDate) > currentDate)
    return true
    return false
}

function CheckSLevelDay(element) {
    if( element.status && isValidatyDayFrom(element)) return true
    return false
}

function isValidatyDayFrom(element){
    return element.segmentValidatyDays.findIndex(el => new Date(el).toISOString() == currentDate.toISOString()) != -1
}

function accumulateDayTime(FunctionCurrentDate) {
    var localRestAcc = 0
    if(FunctionCurrentDate.segmentWorkingPeriods == null) return 0
    for (let index = 0; index < FunctionCurrentDate.segmentWorkingPeriods.length; index++) {
        localRestAcc += (FunctionCurrentDate.segmentWorkingPeriods[index][1].split(':')[0] - FunctionCurrentDate.segmentWorkingPeriods[index][0].split(':')[0]) * 3600
        if(FunctionCurrentDate.segmentWorkingPeriods[index][1].split(':').length > 1) localRestAcc += FunctionCurrentDate.segmentWorkingPeriods[index][1].split(':')[1] - FunctionCurrentDate.segmentWorkingPeriods[index][0].split(':')[1] * 60
        if(FunctionCurrentDate.segmentWorkingPeriods[index][1].split(':').length > 2) localRestAcc += FunctionCurrentDate.segmentWorkingPeriods[index][1].split(':')[2] - FunctionCurrentDate.segmentWorkingPeriods[index][0].split(':')[2]
    }
    return localRestAcc
}

module.exports = FindWorkingPeriod