"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Highchart = ({ data, type, title, height = 300 }) => {
  const options = {
    chart: {
      type: type,
      height: height,
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    title: {
      text: title,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Percentage",
        innerSize: "75%",
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Highchart;
