import moment from "moment";

export const generateXTicks = ({
  startTime,
  endTime,
  spacing: { every, period }
}) => {
  const firstMoment = moment(startTime);
  const firstTick = firstMoment
    .clone()
    .startOf(period)
    .add(1, period);

  const ticks = [firstTick.valueOf()];

  while (ticks[ticks.length - 1] < endTime) {
    let currentTick = ticks[ticks.length - 1];
    let nextTick = moment(currentTick)
      .add(every, period)
      .valueOf();
    if (nextTick > endTime) break;
    ticks.push(nextTick);
  }

  return ticks;
};
