import "temporal-polyfill/global";

// case 1: get today + formatting

const formattingOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'Europe/Berlin',
  }

const todayTemporal = Temporal.Now.plainDateISO().toString();
const formattedTemporalDate = todayTemporal.toLocaleString('de', formattingOptions);
console.log({formattedTemporalDate});

//################################################################################
// case 2: create any date with temporal (difference between from and with)
const temporalYearMonth = Temporal.PlainYearMonth.from({year: 2022, month: 5, day: 28, minutes: 30});
// adjust the object without overwriting the original object
console.log(temporalYearMonth.toString())
console.log(temporalYearMonth.with({year: 2001, month: 2, day: 3}).inLeapYear);

const anyDateTemporal = Temporal.PlainDate.from({ year: 2022, month: 5, day: 28 });
const anyFormattedTemporalDate = anyDateTemporal.toLocaleString('de', formattingOptions);
console.log({anyFormattedTemporalDate})


//################################################################################
// case 3: Get the current time in the time zone of a country of your choice
// correct
const datetimeinstant = Temporal.Now.zonedDateTimeISO();
console.log('here and now', datetimeinstant.toString())
console.log('here and now but in Argentina', datetimeinstant.withTimeZone('America/Argentina/Buenos_Aires').toString()
)

// wrong??
const utcInstant = Temporal.Now.instant();
const timeZoneId = Temporal.Now.timeZoneId();
console.log(utcInstant.toZonedDateTimeISO(timeZoneId).toString());
console.log(utcInstant.toZonedDateTimeISO('America/Argentina/Buenos_Aires').toString());


//################################################################################
// case 4: how much time lies between 2 instances?
const instance1 = Temporal.Instant.from('2022-05-28T10:00:00Z');
const instance2 = Temporal.Instant.from('2022-04-28T12:00:00Z');

const duration = instance1.since(instance2);
const roundedDuration = duration.round({ largestUnit: 'days', smallestUnit: 'seconds' });
console.log(roundedDuration.toString());

//################################################################################

// case 5: Make the epoch time human readable
const instant = Temporal.Instant.fromEpochMilliseconds(1574074321816);

console.log(instant.toString()); // => '2019-11-18T10:52:01.816Z'
console.log(instant.toString({ timeZone: Temporal.TimeZone.from('Europe/Berlin') }));
// => '2019-11-18T10:52:01.816+00:00'
console.log(instant.toString({ timeZone: 'Asia/Seoul' }));
// => '2019-11-18T19:52:01.816+09:00'

// or go from a Date to epoch time
const pastInstant = Temporal.Instant.from('2022-01-01T00:00:00Z');
const epochTime = pastInstant.epochMilliseconds;
console.log('epoch time from instant', epochTime);

//################################################################################
// case 6: arithmetic with Temporal
const date1 = Temporal.PlainDateTime.from('2022-05-28T10:00:00');
const date2 = date1.subtract({ years: 12, days: 10, minutes: 30});
console.log('date arithmetic', date2.toString());


// how many days between to dates?
const temporalStartDate = Temporal.PlainDate.from({ year: 2023, month: 6, day: 25 });
const temporalEndDate = Temporal.PlainDate.from({ year: 2024, month: 6, day: 25 });

const timeBetween = temporalEndDate.since(temporalStartDate, { largestUnit: 'days' });
console.log(`The difference is ${timeBetween.days} days obtained with temporal.`);