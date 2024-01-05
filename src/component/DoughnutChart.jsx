import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
	const chartContainer = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			const ctx = chartContainer.current.getContext("2d");

			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			const suppliersData = data.reduce((acc, entry) => {
				if (!acc[entry.supplier]) {
					acc[entry.supplier] = 0;
				}
				acc[entry.supplier] += entry.emissions;
				return acc;
			}, {});

			const supplierNames = Object.keys(suppliersData);
			const supplierEmissions = Object.values(suppliersData);

			// Define an array of colors for each supplier
			const colors = [
				"rgba(255, 99, 132, 0.6)",
				"rgba(54, 162, 235, 0.6)",
				"rgba(255, 206, 86, 0.6)",
				"rgba(75, 192, 192, 0.6)",
				"rgba(153, 102, 255, 0.6)",
				"rgba(255, 159, 64, 0.6)",
				"rgba(205, 92, 92, 0.6)",
				"rgba(0, 128, 128, 0.6)",
				"rgba(255, 0, 255, 0.6)",
			];

			const backgroundColors = colors.slice(0, supplierNames.length);

			chartInstance.current = new Chart(ctx, {
				type: "doughnut",
				data: {
					labels: supplierNames,
					datasets: [
						{
							label: "Emission by Supplier",
							data: supplierEmissions,
							backgroundColor: backgroundColors,
						},
					],
				},
				options: {
					// Add options here if needed, e.g., legend, tooltips, etc.
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
			<p>Emission by Supplier</p>
			<canvas ref={chartContainer} width={400} height={200}></canvas>
		</div>
	);
};

export default DoughnutChart;
