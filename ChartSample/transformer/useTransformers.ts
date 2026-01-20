import { useMemo } from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import DataSet = ComponentFramework.PropertyTypes.DataSet;
import { ChartData, ChartType } from "chart.js";
import { transformers } from "./transformers";

export const useTransformer = <TType extends ChartType>(chartType: TType, dataset: DataSet, groupBy: string): ChartData<TType, number[], string> => {
    return useMemo(() => {
        const mapped = mapRecords(dataset, groupBy);
        const grouped = groupRecords(mapped, groupBy);

        if (chartType in transformers) {
            return transformers[chartType](grouped) as ChartData<TType, number[], string>;
        }
        throw new Error(`Transformer for chart type ${chartType} not found.`);

    }, [dataset, groupBy, chartType]);
}

function mapRecords(dataset: DataSet, groupBy: string) {
    return Object.keys(dataset.records).map((key: string) => {
        const record = dataset.records[key];
        const ent = {} as Record<string, unknown>;
        dataset.columns.forEach((column: DataSetInterfaces.Column) => {
            if (column.name === groupBy) {
                const value = record.getFormattedValue(column.name);
                ent[column.name] = value;
            }
        });
        return ent;
    });
}

function groupRecords(mapped: Record<string, unknown>[], groupBy: string) {
    const grouped = mapped.reduce((acc, curr) => {
        acc = acc as Record<string, number>;
        curr = curr as Record<string, string>;

        if (groupBy in curr) {
            const groupByValue = curr[groupBy] as string;
            if (!(groupByValue in acc)) {
                acc[groupByValue] = 1;
            }
            else if (groupByValue in acc && typeof acc[groupByValue] === "number") {
                acc[groupByValue]++;
            }
        }
        return acc;
    }, {}) as Record<string, number>;

    return grouped;
}
