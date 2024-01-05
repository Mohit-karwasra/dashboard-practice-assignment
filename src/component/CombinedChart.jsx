import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CombinedChart = ({ data, width, height }) => {
	const chartContainer = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			const ctx = chartContainer.current.getContext("2d");

			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			const data2022 = data.filter((entry) => entry.year === 2022);
			const data2023 = data.filter((entry) => entry.year === 2023);

			const months2022 = data2022.map((entry) => entry.month);
			const emissions2022 = data2022.map((entry) => entry.emissions);
			const months2023 = data2023.map((entry) => entry.month);
			const emissions2023 = data2023.map((entry) => entry.emissions);
			const er2022 = data2022.map((entry) => entry.er);
			const er2023 = data2023.map((entry) => entry.er);

			const allMonths = [...new Set([...months2022, ...months2023])];

			const colors = {
				2022: "rgba(255, 99, 132, 0.6)", // Red color for 2022
				2023: "rgba(54, 162, 235, 0.6)", // Blue color for 2023
			};

			const datasets = [
				{
					label: "Emissions 2022",
					data: allMonths.map((month) => emissions2022[months2022.indexOf(month)] || 0),
					backgroundColor: allMonths.map((_) => colors[2022]),
				},
				{
					label: "Emissions 2023",
					data: allMonths.map((month) => emissions2023[months2023.indexOf(month)] || 0),
					backgroundColor: allMonths.map((_) => colors[2023]),
				},
			];

			// Create line dataset for efficiency ratio (ER)
			const erDatasets = [
				{
					label: "ER 2022",
					data: allMonths.map((month) => er2022[months2022.indexOf(month)] || 0),
					borderColor: "rgba(255, 99, 132, 1)", // Red color for ER 2022
					fill: false,
					type: "line", // Specify type as line
					yAxisID: "x-axis-er", // Assign to a separate y-axis for ER
				},
				{
					label: "ER 2023",
					data: allMonths.map((month) => er2023[months2023.indexOf(month)] || 0),
					borderColor: "rgba(54, 162, 235, 1)", // Blue color for ER 2023
					fill: false,
					type: "line", // Specify type as line
					yAxisID: "x-axis-er", // Assign to a separate y-axis for ER
				},
			];

			chartInstance.current = new Chart(ctx, {
				type: "bar",
				data: {
					labels: allMonths,
					datasets: [...datasets, ...erDatasets], // Combine both bar and line datasets
				},
				options: {
					indexAxis: "x",
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								precision: 0,
								stepSize: 1000,
								callback: function (value) {
									return value.toLocaleString();
								},
							},
						},
						"x-axis-er": {
							position: "right", // Position the ER y-axis on the right side
							beginAtZero: true,
							ticks: {
								precision: 0,
								stepSize: 50,
							},
						},
					},
				},
			});
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data]);
	return (
		<div>
			<p>Emission/Revenue</p>
			<div>
				<canvas ref={chartContainer} width={width} height={height}></canvas>
			</div>
		</div>
	);
};

export default CombinedChart;
