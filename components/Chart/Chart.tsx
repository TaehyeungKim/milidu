import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
import type {ChartData, ChartOptions} from 'chart.js'
import { Chart } from 'react-chartjs-2';

export default function ChartComponent() {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip,
        LineController,
        BarController
      );

    const generalData = [
        {year: 2018,
        total: 300000,
        pass: 34599
        },
        {year: 2019,
        total: 200000,
        pass: 29349},
        {year: 2020,
        total: 100000,
        pass: 12394},
        {year: 2021,
        total: 240000,
        pass: 34567},
        {year: 2022,
        total: 120000,
        pass: 22123}
    ]

    const militaryData = [
            {year: 2018,
            total: 120000,
            pass: 4599
            },
            {year: 2019,
            total: 80000,
            pass: 9349},
            {year: 2020,
            total: 30000,
            pass: 2394},
            {year: 2021,
            total: 40000,
            pass: 4567},
            {year: 2022,
            total: 20000,
            pass: 2123}
    ]

    const data: ChartData  = {
        labels: generalData.map(data=>data.year),
        datasets: [
            {
                type: 'bar',
                label: '응시자수',
                backgroundColor: 'green',
                data: generalData.map(data=>data.total),
                borderColor: 'white',
                borderWidth: 2,
                yAxisID: 'yMain'
            },
            {
                type: 'bar',
                label: '합격자수',
                backgroundColor: 'blue',
                data: generalData.map(data=>data.pass),
                borderColor: 'white',
                borderWidth: 2,
                yAxisID: 'yMain'
            },
            {
                type: 'line',
                label: '합격률',
                borderColor: 'red',
                borderWidth: 2,
                fill: true,
                data: generalData.map(data=>(data.pass/data.total)*100),
                yAxisID: 'yAuxiliary'
            },
            {
                type: 'line',
                label: '군 장병 합격률',
                borderColor: 'navy',
                borderWidth: 2,
                fill: false,
                data: militaryData.map(data=>(data.pass/data.total)*100),
                yAxisID: 'yAuxiliary'
            }
        ],
    }

    const option: ChartOptions = {
        scales: {
            yAuxiliary: {
                type: 'linear',
                display: false,
                position: 'right'
            },
            yMain: {
                type: 'linear',
                display: true,
                position: 'left'
            }

        }
    }

    return(
            <Chart type='bar' data={data} options={option}/>
    )
}
