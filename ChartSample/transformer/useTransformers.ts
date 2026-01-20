import { useMemo } from "react";
import DataSet = ComponentFramework.PropertyTypes.DataSet;
import { ChartData, ChartType } from "chart.js";
import { transformers } from "./transformers";

export const useTransformer = <TType extends ChartType>(chartType: TType, dataset: DataSet): ChartData<TType, number[], string> | null => {
    return useMemo(() => {
        if(!(chartType in transformers)) {
            return null;
        }

        const grouped = groupRecords(dataset);
        
        return transformers[chartType](grouped) as ChartData<TType, number[], string>;
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

        if (value in acc) {
            acc[value]++;
        } else {
            acc[value] = 1;
        }

        return acc;
    }, {} as Record<string, number>);
}