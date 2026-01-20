# Dashboard Chart PCF Component

A Power Apps Component Framework (PCF) control that renders interactive charts from dataset records. Built with React, Chart.js, and Fluent UI.

## Features

- **Multiple Chart Types**: Supports Bar and Doughnut charts
- **Dynamic Data Grouping**: Automatically groups dataset records by a specified column
- **Color Generation**: Generates consistent colors based on data labels using a string-to-color hash function
- **Responsive**: Adapts to allocated height and width from the hosting container
- **Type-Safe**: Written in TypeScript with full type safety

## Supported Chart Types

- **Bar Chart**: Displays grouped data as vertical bars with count values
- **Doughnut Chart**: Shows data distribution in a circular doughnut format

## Configuration

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `chartType` | Enum | Type of chart to display (`bar` or `doughnut`) | `bar` |

### Dataset

| Property Set | Type | Description | Required |
|--------------|------|-------------|----------|
| `groupBy` | SingleLine.Text | Column used to group and aggregate the data | No |

## How It Works

1. **Data Grouping**: The component groups dataset records by the `groupBy` column value
2. **Counting**: Counts occurrences of each unique value
3. **Transformation**: Transforms grouped data into Chart.js-compatible format
4. **Rendering**: Renders the appropriate chart component based on `chartType`

## Technical Architecture

### Key Files

- [`index.ts`](ChartSample/index.ts) - Main PCF control implementation
- [`HelloWorld.tsx`](ChartSample/HelloWorld.tsx) - React chart component with type switching
- [`useTransformers.ts`](ChartSample/transformer/useTransformers.ts) - Custom hook for data transformation
- [`transformers.ts`](ChartSample/transformer/transformers.ts) - Chart-specific data transformers
- [`stringToColor.ts`](ChartSample/helpers/stringToColor.ts) - Color generation utility

### Data Flow

```
Dataset Records → groupRecords() → Record<string, number> → 
Transformer (bar/doughnut) → ChartData → Chart Component
```

## Dependencies

- **React**: 16.14.0
- **Fluent UI**: 9.68.0
- **Chart.js**: Latest (with react-chartjs-2 wrapper)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the component:
   ```bash
   npm run build
   ```

4. Deploy to your Power Apps environment

## Usage in Power Apps

1. Add the component to a canvas app or model-driven app
2. Bind a dataset to the `sampleDataSet` property
3. Configure the `groupBy` column to specify how data should be grouped
4. Select the desired `chartType` (Bar or Doughnut)
5. The chart will automatically update when the dataset changes

## Example Use Cases

- Visualize record counts by status
- Show distribution of records by owner
- Display case counts by priority
- Track opportunity counts by stage

## Development

### Project Structure

```
dashboard-chart/
├── ChartSample/
│   ├── ControlManifest.Input.xml    # PCF manifest
│   ├── index.ts                      # Control entry point
│   ├── Chart.tsx                # Chart components
│   ├── transformer/
│   │   ├── transformers.ts           # Data transformers
│   │   └── useTransformers.ts        # Transformation hook
│   ├── helpers/
│   │   └── stringToColor.ts          # Color utility
│   └── generated/
│       └── ManifestTypes.d.ts        # Generated types
├── package.json
├── tsconfig.json
└── pcfconfig.json
```

### Adding New Chart Types

1. Add the chart type to the `chartType` enum in [`ControlManifest.Input.xml`](ChartSample/ControlManifest.Input.xml)
2. Create a transformer function in [`transformers.ts`](ChartSample/transformer/transformers.ts)
3. Add a case to the switch statement in [`Chart.tsx`](ChartSample/HelloWorld.tsx)
4. Register any additional Chart.js components in [`Chart.tsx`](ChartSample/HelloWorld.tsx)
