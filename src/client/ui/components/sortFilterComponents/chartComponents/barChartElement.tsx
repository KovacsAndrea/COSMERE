import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';

export const BarChartElement: React.FC<{data: any}> = ({data}) => {
    const chartSetting = {
        xAxis: [
          {
            label: 'Number of novels',
          },
        ],
        width: 630,
        height: 400,
      };
    console.log("BARRRRRRRRRRRRRRRRR CHART DATA" + data)
    return (
        <>
        {data.toString().length !==0 ? <BarChart
        dataset={data}
        yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
        series={[{ dataKey: 'value'}]}
        colors={['#2284bd']}
        layout="horizontal"
        margin={{
          left: 130,
        }}
        {...chartSetting}
        /> : <></>}
        
        </>
    );
}