import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  Label, ResponsiveContainer
} from 'recharts';
import moment from "moment";
import { generateXTicks } from '../utils/generateXTicks';

const formatTimestamp = (tick, format) => moment(tick).format(format);

const data = [
  { "time": 1563577200000, "occurence": 17.4 },
  { "time": 1563580800000, "occurence": 17.2 },
  { "time": 1563584400000, "occurence": 17.11 },
  { "time": 1563588000000, "occurence": 17.05 },
  { "time": 1563591600000, "occurence": 16.74 },
  { "time": 1563595200000, "occurence": 16.45 },
  { "time": 1563598800000, "occurence": 16.45 },
  { "time": 1563602400000, "occurence": 17 },
  { "time": 1563606000000, "occurence": 17.67 },
  { "time": 1563609600000, "occurence": 18.9 },
  { "time": 1563613200000, "occurence": 18.76 },
  { "time": 1563616800000, "occurence": 18.6 },
  { "time": 1563620400000, "occurence": 19.34 },
  { "time": 1563624000000, "occurence": 19.88 },
  { "time": 1563627600000, "occurence": 20.13 },
  { "time": 1563631200000, "occurence": 21.66 },
  { "time": 1563634800000, "occurence": 22.5 },
  { "time": 1563638400000, "occurence": 22.17 },
  { "time": 1563642000000, "occurence": 21.42 },
  { "time": 1563645600000, "occurence": 20.8 },
  { "time": 1563649200000, "occurence": 20.2 },
  { "time": 1563652800000, "occurence": 19.34 },
  { "time": 1563656400000, "occurence": 18.56 },
  { "time": 1563660000000, "occurence": 17.55 },
  { "time": 1563663600000, "occurence": 16.57 },
  { "time": 1563667200000, "occurence": 15.69 },
  { "time": 1563670800000, "occurence": 14.98 },
  { "time": 1563674400000, "occurence": 14.24 },
  { "time": 1563678000000, "occurence": 13.63 },
  { "time": 1563681600000, "occurence": 13.26 },
  { "time": 1563685200000, "occurence": 13.19 },
  { "time": 1563688800000, "occurence": 12.97 },
  { "time": 1563692400000, "occurence": 13.76 },
  { "time": 1563696000000, "occurence": 14.65 },
  { "time": 1563699600000, "occurence": 16.58 },
  { "time": 1563703200000, "occurence": 18.64 },
  { "time": 1563706800000, "occurence": 20.5 },
  { "time": 1563710400000, "occurence": 21.36 },
  { "time": 1563714000000, "occurence": 22.02 },
  { "time": 1563717600000, "occurence": 22.55 },
  { "time": 1563721200000, "occurence": 22.64 },
  { "time": 1563724800000, "occurence": 22.68 },
  { "time": 1563728400000, "occurence": 22.33 },
  { "time": 1563732000000, "occurence": 21.88 },
  { "time": 1563735600000, "occurence": 20.89 },
  { "time": 1563739200000, "occurence": 19.83 },
  { "time": 1563742800000, "occurence": 18.73 },
  { "time": 1563746400000, "occurence": 17.46 },
  { "time": 1563750000000, "occurence": 16.7 },
  { "time": 1563753600000, "occurence": 16.06 },
  { "time": 1563757200000, "occurence": 15.72 },
  { "time": 1563760800000, "occurence": 15.56 },
  { "time": 1563764400000, "occurence": 15.5 },
  { "time": 1563768000000, "occurence": 15.54 },
  { "time": 1563771600000, "occurence": 15.97 },
  { "time": 1563775200000, "occurence": 17.01 },
  { "time": 1563778800000, "occurence": 18.44 },
  { "time": 1563782400000, "occurence": 20.31 },
  { "time": 1563786000000, "occurence": 22.01 },
  { "time": 1563789600000, "occurence": 23.51 },
  { "time": 1563793200000, "occurence": 24.7 },
  { "time": 1563796800000, "occurence": 25.55 },
  { "time": 1563800400000, "occurence": 25.94 },
  { "time": 1563804000000, "occurence": 26.15 },
  { "time": 1563807600000, "occurence": 26.32 },
  { "time": 1563811200000, "occurence": 26.42 },
  { "time": 1563814800000, "occurence": 26.18 },
  { "time": 1563818400000, "occurence": 25.46 },
  { "time": 1563822000000, "occurence": 24.56 },
  { "time": 1563825600000, "occurence": 23.41 },
  { "time": 1563829200000, "occurence": 22.39 },
  { "time": 1563832800000, "occurence": 21.4 },
  { "time": 1563836400000, "occurence": 20.55 },
  { "time": 1563840000000, "occurence": 19.77 },
  { "time": 1563843600000, "occurence": 19.39 },
  { "time": 1563847200000, "occurence": 19.12 },
  { "time": 1563850800000, "occurence": 18.84 },
  { "time": 1563854400000, "occurence": 18.56 },
  { "time": 1563858000000, "occurence": 18.45 },
  { "time": 1563861600000, "occurence": 19.13 },
  { "time": 1563865200000, "occurence": 20.31 },
  { "time": 1563868800000, "occurence": 21.73 },
  { "time": 1563872400000, "occurence": 23.48 },
  { "time": 1563876000000, "occurence": 25.51 },
  { "time": 1563879600000, "occurence": 27.75 },
  { "time": 1563883200000, "occurence": 29.89 },
  { "time": 1563886800000, "occurence": 30.92 },
  { "time": 1563890400000, "occurence": 31.22 },
  { "time": 1563894000000, "occurence": 31.36 },
  { "time": 1563897600000, "occurence": 30.48 },
  { "time": 1563901200000, "occurence": 28.86 },
  { "time": 1563904800000, "occurence": 27.08 },
  { "time": 1563908400000, "occurence": 25.18 },
  { "time": 1563912000000, "occurence": 23.86 },
  { "time": 1563915600000, "occurence": 22.82 },
  { "time": 1563919200000, "occurence": 22.05 },
  { "time": 1563922800000, "occurence": 21.68 },
  { "time": 1563926400000, "occurence": 21.6 },
  { "time": 1563930000000, "occurence": 23.82 },
  { "time": 1563933600000, "occurence": 23.69 },
  { "time": 1563937200000, "occurence": 23.05 },
  { "time": 1563940800000, "occurence": 22.52 },
  { "time": 1563944400000, "occurence": 21.79 },
  { "time": 1563948000000, "occurence": 21.64 },
  { "time": 1563951600000, "occurence": 22.27 },
  { "time": 1563955200000, "occurence": 23.84 },
  { "time": 1563958800000, "occurence": 25.39 },
  { "time": 1563962400000, "occurence": 26.33 },
  { "time": 1563966000000, "occurence": 27.33 },
  { "time": 1563969600000, "occurence": 28.16 },
  { "time": 1563973200000, "occurence": 28.91 },
  { "time": 1563976800000, "occurence": 29.26 },
  { "time": 1563980400000, "occurence": 29.15 },
  { "time": 1563984000000, "occurence": 28.65 },
  { "time": 1563987600000, "occurence": 28.09 },
  { "time": 1563991200000, "occurence": 27.49 },
  { "time": 1563994800000, "occurence": 26.64 },
  { "time": 1563998400000, "occurence": 26.07 },
  { "time": 1564002000000, "occurence": 25.6 },
  { "time": 1564005600000, "occurence": 24.91 },
  { "time": 1564009200000, "occurence": 24.2 },
  { "time": 1564012800000, "occurence": 24.07 },
  { "time": 1564016400000, "occurence": 23.44 },
  { "time": 1564020000000, "occurence": 22.59 },
  { "time": 1564023600000, "occurence": 21.33 },
  { "time": 1564027200000, "occurence": 20.25 },
  { "time": 1564030800000, "occurence": 20 },
  { "time": 1564034400000, "occurence": 21.14 },
  { "time": 1564038000000, "occurence": 23.06 },
  { "time": 1564041600000, "occurence": 25.91 },
  { "time": 1564045200000, "occurence": 28.79 },
  { "time": 1564048800000, "occurence": 30.95 },
  { "time": 1564052400000, "occurence": 32.55 },
  { "time": 1564056000000, "occurence": 34.24 },
  { "time": 1564059600000, "occurence": 35.27 },
  { "time": 1564063200000, "occurence": 35.85 },
  { "time": 1564066800000, "occurence": 36.24 },
  { "time": 1564070400000, "occurence": 35.62 },
  { "time": 1564074000000, "occurence": 35.27 },
  { "time": 1564077600000, "occurence": 34.62 },
  { "time": 1564081200000, "occurence": 32.27 },
  { "time": 1564084800000, "occurence": 29.43 },
  { "time": 1564088400000, "occurence": 29.04 },
  { "time": 1564092000000, "occurence": 28.02 },
  { "time": 1564095600000, "occurence": 27.01 },
  { "time": 1564099200000, "occurence": 24.59 },
  { "time": 1564102800000, "occurence": 23.12 },
  { "time": 1564106400000, "occurence": 22.08 },
  { "time": 1564110000000, "occurence": 21.33 },
  { "time": 1564113600000, "occurence": 20.48 },
  { "time": 1564117200000, "occurence": 19.86 },
  { "time": 1564120800000, "occurence": 20.01 },
  { "time": 1564124400000, "occurence": 20.87 },
  { "time": 1564128000000, "occurence": 21.87 },
  { "time": 1564131600000, "occurence": 22.9 },
  { "time": 1564135200000, "occurence": 23.7 },
  { "time": 1564138800000, "occurence": 24.23 },
  { "time": 1564142400000, "occurence": 24.35 },
  { "time": 1564146000000, "occurence": 24.67 },
  { "time": 1564149600000, "occurence": 25.04 },
  { "time": 1564153200000, "occurence": 25.44 },
  { "time": 1564156800000, "occurence": 25.54 },
  { "time": 1564160400000, "occurence": 24.49 },
  { "time": 1564164000000, "occurence": 21.31 },
  { "time": 1564167600000, "occurence": 21.35 },
  { "time": 1564171200000, "occurence": 21.46 },
  { "time": 1564174800000, "occurence": 20.63 },
  { "time": 1564178400000, "occurence": 19.44 },
  { "time": 1564182000000, "occurence": 19.19 },
  { "time": 1564185600000, "occurence": 18.57 },
  { "time": 1564189200000, "occurence": 17.91 },
  { "time": 1564192800000, "occurence": 16.93 },
  { "time": 1564196400000, "occurence": 16.42 },
  { "time": 1564200000000, "occurence": 16.01 },
  { "time": 1564203600000, "occurence": 15.93 },
  { "time": 1564207200000, "occurence": 16.44 },
  { "time": 1564210800000, "occurence": 16.88 },
  { "time": 1564214400000, "occurence": 17.52 },
  { "time": 1564218000000, "occurence": 18 },
  { "time": 1564221600000, "occurence": 18.56 },
  { "time": 1564225200000, "occurence": 19.03 },
  { "time": 1564228800000, "occurence": 20.36 },
  { "time": 1564232400000, "occurence": 20.48 },
  { "time": 1564236000000, "occurence": 20.79 },
  { "time": 1564239600000, "occurence": 20.48 },
  { "time": 1564243200000, "occurence": 21.12 },
  { "time": 1564246800000, "occurence": 21.52 },
  { "time": 1564250400000, "occurence": 21.18 },
  { "time": 1564254000000, "occurence": 20.67 },
  { "time": 1564257600000, "occurence": 19.99 },
  { "time": 1564261200000, "occurence": 19.33 },
  { "time": 1564264800000, "occurence": 18.48 }
]

export default function TrendGraph() {
  const timestampFormat = "DD/MM/YYYY HH:mm";
  const xTickFormat = "Do MMM 'YY";
  const startTime = data[0].time
  const endTime = data[data.length - 1].time;
  const xTickSpacing = { every: 1, period: "day" };
  const xTicks = generateXTicks({ startTime, endTime, spacing: xTickSpacing });

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <defs>
          <linearGradient id="occurence" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#540d6e" />
            <stop offset="25%" stopColor="#c14bbb" />
            <stop offset="50%" stopColor="#ff0000" />
            <stop offset="75%" stopColor="#ff8317" />
            <stop offset="100%" stopColor="#ffdd21" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={tick => formatTimestamp(tick, xTickFormat)}
          ticks={xTicks}
        >
          <Label
            value={"Time"}
            position="bottom"
            style={{ textAnchor: "middle" }}
          />
        </XAxis>
        <YAxis>
          <Label
            value={"Occurence"}
            position="left"
            style={{ textAnchor: "middle" }}
            angle={-90}
          />
        </YAxis>
        <Tooltip
          labelFormatter={tick => formatTimestamp(tick, timestampFormat)}
        />
        <Line
          dataKey="occurence"
          name="Occurence"
          dot={false}
          type={"natural"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
