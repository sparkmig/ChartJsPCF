import {useMemo} from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import DataSet = ComponentFramework.PropertyTypes.DataSet;
import { ChartData, ChartType } from "chart.js";

export const useTransformer =<TType extends ChartType>(chartType: TType, dataset: DataSet, groupBy: string): ChartData<TType, number[], string> => {
    return useMemo(() => {
        const mapped = mapRecords(dataset, groupBy);
        const grouped = groupRecords(mapped, groupBy);
        
        switch(chartType) {
            case "doughnut":
                return transformers.doughnut(grouped) as ChartData<TType, number[], string>;
            default:
                throw new Error(`Unsupported chart type: ${chartType}`);
        }
    }, [dataset, groupBy, chartType]);
}

const doughnut = (grouped: Record<string, number>) => {    

    const data: ChartData<"doughnut", number[], string> = {
            labels: Object.keys(grouped),
            datasets: [{
                data: Object.values(grouped),
                backgroundColor: Object.keys(grouped).map(key => stringToColor(key)),
            }],
        };

        return data;
}

const transformers = {
    doughnut,
};



function mapRecords(dataset: DataSet, groupBy: string) {
    return Object.keys(dataset.records).map((key: string) => {
            const record = dataset.records[key];
            const ent = {} as Record<string, unknown>;
            dataset.columns.forEach((column: DataSetInterfaces.Column) => {
                if(column.name === groupBy) {
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
        }, {} ) as Record<string, number>;

    return grouped;
}

function stringToColor(str: string): string {
    let hash = 0;

    // Create a hash from the string
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert hash to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += value.toString(16).padStart(2, '0');
    }
    return color;
}