import { Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

interface doughnutProps {
    options: ChartOptions<'doughnut'>;
    data: ChartData<'doughnut'>;
}

const DoughnutChart = ({losses, wins} : {losses: number, wins: number}) => {
    const labels = ['wins', 'loss']
    const data = {
        labels: labels,
        datasets: [{
            label: 'Doughnut chart',
            data: [wins, losses],
            backgroundColor: [
                'rgb(86,134,229)',
                'rgb(230,67,90)',
            ],
            borderColor: [
                'rgb(86,134,229)',
                'rgb(230,67,90)',
            ],
        }]
    }

    return(
        <div className={"h-24 w-24"}>
            <Doughnut
                      data={data}
                      options={{
                          cutout: 35,
                          responsive: true,
                          maintainAspectRatio: true
                      }}
            />
        </div>
    )
}

export default DoughnutChart