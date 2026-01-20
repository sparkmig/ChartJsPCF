import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartType, registerables } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTransformer } from './transformer/useTransformers';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerables);

export interface IChartProps {
  name?: string;
  allocatedHeight: number;
  allocatedWidth: number;
  dataset: ComponentFramework.PropertyTypes.DataSet;
  chartType?: ChartType;
  groupBy?: string;
}

export function Chart({ allocatedHeight, allocatedWidth, dataset, chartType = "doughnut" }: IChartProps): React.ReactElement {
  const transformed = useTransformer(chartType, dataset);
  if (!transformed) {
    return <Label>Chart type transformer for: {chartType} is not supported.</Label>
  }
  return <div style={{ height: allocatedHeight, width: allocatedWidth }}>
    <ChartSwitch chartType={chartType} data={transformed} />
  </div>
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
    default:
      return <Label>Chart type {chartType} not supported.</Label>
  }
}