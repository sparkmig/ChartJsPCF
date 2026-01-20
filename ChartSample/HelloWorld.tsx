import * as React from 'react';
import { Label } from '@fluentui/react-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTransformer } from './transformer/useTransformers';

ChartJS.register(ArcElement, Tooltip, Legend);
export interface IChartProps {
  name?: string;
  allocatedHeight: number;
  allocatedWidth: number;
  dataset: ComponentFramework.PropertyTypes.DataSet;
}

export function Chart(props: IChartProps): React.ReactElement {
    const { allocatedHeight, allocatedWidth } = props;
    const transformed = useTransformer("doughnut", props.dataset, "Name");

    return (
      <div style={{width: allocatedWidth, height: allocatedHeight}}>
        <Doughnut height={100} width={100} style={{height: 10}} data={transformed} />
      </div>
    )
}

