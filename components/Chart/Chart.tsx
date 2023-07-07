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
import {CertStats} from '@/pages/certification/[id]'

interface ChartComponentProps {
    stats_data: CertStats[]
}

export default function ChartComponent({stats_data}:ChartComponentProps) {
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
        labels: stats_data.map(data=>data.year),
        datasets: [
            {
                type: 'bar',
                label: '응시자수',
                backgroundColor: '#F77E73',
                data: stats_data.map(data=>data.test_taken),
                borderColor: 'white',
                borderWidth: 4,
                yAxisID: 'yMain'
            },
            {
                type: 'bar',
                label: '합격자수',
                backgroundColor: '#9B64A8',
                data: stats_data.map(data=>data.test_passed),
                borderColor: 'white',
                borderWidth: 4,
                yAxisID: 'yMain'
            },
            {
                type: 'line',
                label: '합격률',
                borderColor: '#657899',
                borderWidth: 4,
                fill: true,
                data: stats_data.map(data=>(data.pass_rate)),
                yAxisID: 'yAuxiliary'
            },
            {
                type: 'line',
                label: '군 장병 합격률',
                borderColor: '#FFA5C4',
                borderWidth: 4,
                fill: false,
                data: stats_data.map(data=>((data.military_passed/data.military_taken)*100)),
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
