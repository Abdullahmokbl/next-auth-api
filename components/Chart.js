import { Bar, Pie } from "react-chartjs-2";
// import {Chart as ChartJS,ArcElement,Tooltip,Legend,CategoryScale} from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);
import Chart from "chart.js/auto";
// import { Chart, registerables} from 'chart.js';
// Chart.register(...registerables);

export default function MyChart({ type, data }) {
  const Comp = type;
  return <Bar data={data} />;
}
