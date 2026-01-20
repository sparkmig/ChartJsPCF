import { useMemo } from "react";
import { ChartData, ChartType } from "chart.js";
import { transformers } from "./transformers";

import DataSet = ComponentFramework.PropertyTypes.DataSet;
import { TransformerError } from "./errors";

/**
 * 
 * @param chartType The type of chart
 * @param dataset The dataset of the view.
 * @returns Transformed dataset, so the chart component is available to read it.
 */
export const useTransformer = <TType extends ChartType>(chartType: TType, dataset: DataSet): [ChartData<TType, number[], string> | null, TransformerError] => {
    return useMemo(() => {
        if (!(chartType in transformers)) {
            return [null, TransformerError.NoTransformer];
        } else if (Object.keys(dataset.records).length === 0) {
            return [null, TransformerError.NoData];
        }

        const grouped = groupRecords(dataset);

        return [transformers[chartType](grouped) as ChartData<TType, number[], string>, TransformerError.None];
    }, [dataset, chartType]);
}


/**
 * 
 * @param dataset the dataset to be grouped.
 * @returns An object, where the groupBy is the properties/keys, and the values is the amount the key is represented in the dataset
 */
function groupRecords(dataset: DataSet) {
    return Object.keys(dataset.records).reduce((acc, curr) => {
        const record = dataset.records[curr];
        const value = record.getFormattedValue("groupBy");
        acc[value] = (acc[value] || 0) + 1;

        return acc;
    }, {} as Record<string, number>);
}