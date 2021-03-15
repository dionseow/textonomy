import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  Label, ResponsiveContainer
} from 'recharts';
import moment from "moment";
import { generateXTicks } from '../utils/generateXTicks';

const formatTimestamp = (tick, format) => moment(tick).format(format);

const data = [
  { "time": 1563577200000, "Donald Trump": 17.4, "Joe Biden": 20.01 },
  { "time": 1563580800000, "Donald Trump": 17.2, "Joe Biden": 23.01 },
  { "time": 1563584400000, "Donald Trump": 17.11, "Joe Biden": 21.01 },
  { "time": 1563588000000, "Donald Trump": 17.05, "Joe Biden": 22.01 },
  { "time": 1563591600000, "Donald Trump": 16.74, "Joe Biden": 18.01 },
  { "time": 1563595200000, "Donald Trump": 16.45, "Joe Biden": 17.01 },
  { "time": 1563598800000, "Donald Trump": 16.45, "Joe Biden": 19.01 },
  { "time": 1563602400000, "Donald Trump": 17, "Joe Biden": 20.01 },
  { "time": 1563606000000, "Donald Trump": 17.67, "Joe Biden": 20.01 },
  { "time": 1563609600000, "Donald Trump": 18.9, "Joe Biden": 20.01 },
  { "time": 1563613200000, "Donald Trump": 18.76, "Joe Biden": 16.01 },
  { "time": 1563616800000, "Donald Trump": 18.6, "Joe Biden": 25.01 },
  { "time": 1563620400000, "Donald Trump": 19.34, "Joe Biden": 20.01 },
  { "time": 1563624000000, "Donald Trump": 19.88, "Joe Biden": 21.01 },
  { "time": 1563627600000, "Donald Trump": 20.13, "Joe Biden": 23.01 },
  { "time": 1563631200000, "Donald Trump": 21.66, "Joe Biden": 18.01 },
]

export default function MultiTrendGraph() {
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
        <Legend />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={tick => formatTimestamp(tick, xTickFormat)}
          ticks={xTicks}
        >
          <Label
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
          dataKey="Donald Trump"
          name="Donald Trump"
          dot={false}
          type={"natural"}
          stroke="#82ca9d"
        />
        <Line
          dataKey="Joe Biden"
          name="Joe Biden"
          dot={false}
          type={"natural"}
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
