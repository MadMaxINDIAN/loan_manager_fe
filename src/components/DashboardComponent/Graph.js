import React from "react";
import { Chart } from "react-google-charts";

const Graph = (props) => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const tmp = [];
    tmp.push(
      7 - props.seven[0].data[i][0] - 1
        ? `${7 - props.seven[0].data[i][0] - 1} days ago`
        : "Today"
    );
    tmp.push(props.seven[0].data[i][1]);
    tmp.push(props.seven[1].data[i][1]);
    arr.push(tmp);
  }
  const data = [["Day", "Investment", "Received"], ...arr];
  const options = {
    chart: {
      title: "Seven Days Summary",
    },
    hAxis: {
      title: "Day",
      gridlines: {
        count: 7,
      },
    },
    vAxis: {
      title: "Amount",
      gridlines: {
        count: 7,
      },
    },
  };
  return (
    <div>
      <Chart
        chartType="Line"
        data={data}
        width="100%"
        legendToggle
        options={options}
      />
    </div>
  );
};

export default Graph;
