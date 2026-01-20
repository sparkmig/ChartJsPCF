import { ChartData, ChartType } from "chart.js";
import { stringToColor } from "../helpers/stringToColor";

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

const bar = (grouped: Record<string, number>) => {
    const data: ChartData<"bar", number[], string> = {
        labels: Object.keys(grouped),
        datasets: [{
            label: 'Count',
            data: Object.values(grouped),
            backgroundColor: Object.keys(grouped).map(key => stringToColor(key)),
            
        }],
    };  
    
    return data;
}

export const transformers = {
    doughnut,
    bar
} as Record<ChartType, (grouped: Record<string, number>) => ChartData<ChartType, number[], string>>;

