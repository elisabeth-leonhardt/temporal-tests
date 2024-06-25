import "temporal-polyfill/global";

// no timezones
const date = Temporal.PlainDate.from({ year: 2024, month: 5, day: 28 }); // => 2006-08-24
date.year; // => 2006
date.inLeapYear; // => false
console.log(date.toString());

// I want to know the time just now in my local timezone
const justNow = Temporal.Now.plainDateTimeISO("Europe/Berlin").toString();
console.log("Just now: ", justNow);

// I want to know the time just now but in Argentina
const justNowInArgentina = Temporal.Now.plainDateTimeISO(
  "America/Argentina/Buenos_Aires",
).toString();

console.log("Just now but in Argentina: ", justNowInArgentina);

// Parse a date from a string
const instant = Temporal.Instant.from("1969-07-20T20:17Z");
console.log(instant.toString()); // => '1969-07-20T20:17:00Z'
console.log(instant.epochMilliseconds); // => -14182980000

// Convert somethings from days into seconds

const duration = Temporal.Duration.from({
  days: 2,
  hours: 130,
  minutes: 20,
});

const seconds = duration.total({ unit: "seconds" });
console.log(`2 days, 130 hours and 20 minutes are ${seconds} seconds`);

// Intl.DateTimeFormat compatible!! 🥳

// const fakeAggregatedProductWhereEbayImportIsOlderThan24Hours = getFakedAggregateProduct()
//         fakeAggregatedProductWhereEbayImportIsOlderThan24Hours._lastAttempt = {
//             ebay: faker.date.recent({ days: 10, refDate: new Date(Date.now() - 25 * 60 * 60 * 1000) }),
//         }

let zdt = Temporal.ZonedDateTime.from(
  "2022-02-28T11:06:00.092121729+08:00[Asia/Shanghai][u-ca=chinese]",
);

zdt = zdt.withCalendar("gregory");

const europe = zdt
  .withTimeZone("Europe/Paris")
  .toPlainDate()
  .subtract({ years: 3000 })
  .toLocaleString("fr-FR", { calendar: "gregory", dateStyle: "long" });
// => "28 février 2022"
console.log(europe);
const america = zdt
  .withTimeZone("America/New_York")
  .toPlainDate()
  .subtract({ years: 3000 })
  .toLocaleString("en-US", {
    calendar: "gregory",
    era: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
// => "February 27, 979 BC"
console.log(america);
