import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartType, registerables } from "chart.js";
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";
import { useTransformer } from './transformer/useTransformers';
import { TransformerError } from './transformer/errors';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerables);

export interface IChartProps {
  name?: string;
  allocatedHeight: number;
  allocatedWidth: number;
  dataset: ComponentFramework.PropertyTypes.DataSet;
  chartType?: ChartType;
}

export function Chart({ allocatedHeight, allocatedWidth, dataset, chartType = "doughnut" }: IChartProps): React.ReactElement {
  const [data, error] = useTransformer(chartType, dataset);
  
  switch (error) {
    case TransformerError.NoTransformer:
      return <Label> No transformer found for chart type {chartType} </Label>;
    case TransformerError.NoData:
      return <Label> No data available to display the chart. </Label>;
    case TransformerError.None:
      return <div style={{ height: allocatedHeight, width: allocatedWidth }}>
        {data && <ChartSwitch chartType={chartType} data={data} />}
      </div>;
  }
}

interface IChartSwitchProps<TType extends ChartType> {
  chartType: TType;
  data: ChartData<TType, number[], string>;
}

function ChartSwitch<TType extends ChartType>({ chartType, data }: IChartSwitchProps<TType>): React.ReactElement {
  switch (chartType) {
    case "doughnut":
      return <Doughnut data={data as ChartData<"doughnut", number[], string>} />
    case "bar":
      return <Bar data={data as ChartData<"bar", number[], string>} />
    case "pie":
      return <Pie data={data as ChartData<"pie", number[], string>} />
    case "bubble":
      return <Bubble data={data as ChartData<"bubble", number[], string>} />
    case "radar":
      return <Radar data={data as ChartData<"radar", number[], string>} />
    case "line":
      return <Line data={data as ChartData<"line", number[], string>} />
    case "polarArea":
      return <PolarArea data={data as ChartData<"polarArea", number[], string>} />
    case "scatter":
      return <Scatter data={data as ChartData<"scatter", number[], string>} />
    default:
      return <Label>Chart type {chartType} not supported.</Label>
  }
}