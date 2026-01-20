import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartType, ChartTypeRegistry } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTransformer } from './transformer/useTransformers';

ChartJS.register(ArcElement, Tooltip, Legend);
export interface IChartProps {
  name?: string;
  allocatedHeight: number;
  allocatedWidth: number;
  dataset: ComponentFramework.PropertyTypes.DataSet;
  chartType?: ChartType;
}

export function Chart({ allocatedHeight, allocatedWidth, dataset, chartType = "doughnut" }: IChartProps): React.ReactElement {
  const transformed = useTransformer(chartType, dataset, "Name");

  return <div style={{height: allocatedHeight, width: allocatedWidth}}>
      <ChartSwitch chartType={chartType} data={transformed} />;
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
    default:
      return <Label>Chart type {chartType} not supported.</Label>
  }
}