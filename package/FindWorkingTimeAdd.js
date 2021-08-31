var startingDate = null;
var segmentsFLevel = null;
var segmentsSLevel = null;
var segmentsTLevel = null;
var accumulator = 0;
var currentDate = null;
var AdditionalSecs = 0
var returnDate = null

function FindWorkingPeriod(startDate, InnerSegments, additionalSecs) {
    // Filling variables
    startingDate = new Date(startDate)
    currentDate = new Date(startDate)
    segmentsFLevel = InnerSegments.filter(el => el.segmentLevel == 1 && el.status)
    segmentsSLevel = InnerSegments.filter(el => el.segmentLevel == 2 && el.status)
    segmentsTLevel = InnerSegments.filter(el => el.segmentLevel == 3 && el.status)
    AdditionalSecs = additionalSecs

    //Counting time of each day and accumulating the result

    for (let index = 0; index < index + 1; index++) {
        if(returnDate != null) break
        calcDayTime()
    }
    return returnDate
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

    accumulateDayTime(FunctionCurrentDate)

    currentDate.setDate(currentDate.getDate() + 1)
}

function CheckFLevelDay(element, FunctionDayOfWeek) {
    if( element.segmentWorkingPeriods[FunctionDayOfWeek] != null
        && element.status)
    return true
    return false
}

function CheckSLevelDay(element) {
    return ( element.status && isValidatyDayFrom(element))
}

function isValidatyDayFrom(element){
    currentDate.setHours(0)
    return element.segmentValidatyDays.findIndex(el => new Date(el).toISOString() == currentDate.toISOString()) != -1
}

function accumulateDayTime(FunctionCurrentDate) {
    //startingDate, accumulator and FunctionCurrentDate
    var periods = FunctionCurrentDate.segmentWorkingPeriods
    var FinalDate = null

    if(FunctionCurrentDate.segmentWorkingPeriods == null) {
        startingDate.setHours(0)
        startingDate.setMinutes(0)
        startingDate.setSeconds(0)
        return
    }
    for (let index = 0; index < periods.length; index++) {
        var dateStart = periods[index][0].split(':')
        var dateEnd = periods[index][1].split(':')
        
        if (startingDate.getHours() * 3600 + startingDate.getMinutes() * 60 + startingDate.getSeconds() > Number(dateStart[0]) * 3600 + Number(dateStart[1]) * 60 + Number(dateStart[2])
        && startingDate.getHours() * 3600 + startingDate.getMinutes() * 60 + startingDate.getSeconds() < Number(dateEnd[0]) * 3600 + Number(dateEnd[1]) * 60 + Number(dateEnd[2])) {
            periods[index] = [`${startingDate.getHours()}:${startingDate.getMinutes()}:${startingDate.getSeconds()}`, periods[index][1]]
        } else if (startingDate.getHours() * 3600 + startingDate.getMinutes() * 60 + startingDate.getSeconds() > Number(dateStart[0]) * 3600 + Number(dateStart[1]) * 60 + Number(dateStart[2])
        && startingDate.getHours() * 3600 + startingDate.getMinutes() * 60 + startingDate.getSeconds() > Number(dateEnd[0]) * 3600 + Number(dateEnd[1]) * 60 + Number(dateEnd[2])) {
            periods = periods.slice(index + 1, periods.length)
            index -= 1
        }
    }

    for (let index = 0; index < periods.length; index++) {
        var localRestAcc = accumulator

        localRestAcc += (periods[index][1].split(':')[0] - periods[index][0].split(':')[0]) * 3600
        if(periods[index][1].split(':').length > 1) localRestAcc += (periods[index][1].split(':')[1] - periods[index][0].split(':')[1]) * 60
        if(periods[index][1].split(':').length > 2) localRestAcc += periods[index][1].split(':')[2] - FunctionCurrentDate.segmentWorkingPeriods[index][0].split(':')[2]

        if(localRestAcc > AdditionalSecs) {
            FinalDate = new Date(currentDate)
            FinalDate.setHours(periods[index][1].split(':')[0])
            FinalDate.setMinutes(periods[index][1].split(':')[1])
            FinalDate.setSeconds(periods[index][1].split(':')[2])
            FinalDate.setSeconds(FinalDate.getSeconds() - (localRestAcc - AdditionalSecs))
            return returnDate = FinalDate
        } else {
            accumulator += localRestAcc
        }
    }
}

module.exports = FindWorkingPeriod