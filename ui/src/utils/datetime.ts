import { DateTime } from "luxon";

const tz = "UTC+1";
DateTime.local().setZone(tz);

const units: Intl.RelativeTimeFormatUnit[] = [
  "year",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
];

export const timeAgo = (ts: string) => {
  const dateTime = DateTime.fromISO(ts);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) || "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

const unitsShort = ["y", "mo", "w", "d", "h", "m", "s"];

export const timeAgoShort = (ts: string) => {
  let r = timeAgo(ts);
  // r = r.replace("ago", "");
  r = r.replace(" years", "y");
  r = r.replace(" year", "y");
  r = r.replace(" months", "mo");
  r = r.replace(" month", "mo");
  r = r.replace(" weeks", "w");
  r = r.replace(" week", "w");
  r = r.replace(" days", "d");
  r = r.replace(" day", "d");
  r = r.replace(" hours", "h");
  r = r.replace(" hour", "h");
  r = r.replace(" minutes", "m");
  r = r.replace(" minute", "m");
  r = r.replace(" seconds", "s");
  r = r.replace(" second", "s");
  return r;
};
