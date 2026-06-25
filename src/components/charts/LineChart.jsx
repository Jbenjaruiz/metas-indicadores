import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function LineChart({ labels, datasets, height = 260, titulo }) {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      fill: ds.fill ?? false,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      ...ds,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
      title: titulo ? { display: true, text: titulo, font: { size: 13, weight: '600' } } : { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { color: '#F3F2F1' }, ticks: { font: { size: 11 } } },
      y: { grid: { color: '#F3F2F1' }, ticks: { font: { size: 11 } } },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
}
