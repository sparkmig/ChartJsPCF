import { ChartData, ChartType } from "chart.js";
import { stringToColor } from "../helpers/stringToColor";

const baseTransform = (grouped: Record<string, number>) => {
    return {
        labels: Object.keys(grouped),
        datasets: [{
            data: Object.values(grouped),
            backgroundColor: Object.keys(grouped).map(key => stringToColor(key)),
        }],
    };
}

const doughnut = (grouped: Record<string, number>) => {
    const data = baseTransform(grouped) as ChartData<"doughnut", number[], string>;

    return data;
}

const pie = (grouped: Record<string, number>) => {
    const data = baseTransform(grouped) as ChartData<"pie", number[], string>;

    return data;
}

const bar = (grouped: Record<string, number>) => {
    const data = baseTransform(grouped) as ChartData<"bar", number[], string>;  
    return data;
}

const polarArea = (grouped: Record<string, number>) => {
    const data = baseTransform(grouped) as ChartData<"polarArea", number[], string>;
    return data;
}

const line = (grouped: Record<string, number>) => {
    const data: ChartData<"line", number[], string> = {
        labels: Object.keys(grouped),
        datasets: [{
            label: 'Count',
            data: Object.values(grouped),
            borderColor: Object.keys(grouped).map(key => stringToColor(key)),
            fill: false,
        }],
    };
    return data;
}

const radar = (grouped: Record<string, number>) => {
    const data: ChartData<"radar", number[], string> = {
        labels: Object.keys(grouped),
        datasets: [{
            label: 'Count',
            data: Object.values(grouped),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }],
    };
    return data;
}

export const transformers = {
    doughnut,
    bar,
    pie,
    polarArea,
    line,
    radar 
} as Record<ChartType, (grouped: Record<string, number>) => ChartData<ChartType, number[], string>>;

