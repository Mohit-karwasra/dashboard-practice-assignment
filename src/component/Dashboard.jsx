import React, { useState } from "react";
import Header from "./Header";
import DoughnutChart from "./DoughnutChart";
import CombinedChart from "./CombinedChart";
import Table from "./Table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = ({ data }) => {
	const [showEnergyObjects, setShowEnergyObjects] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [filteredData, setFilteredData] = useState(null);

	const toggleEnergyObjects = () => {
		setShowEnergyObjects(!showEnergyObjects);
	};

	const filterAndSortData = (startDate, endDate) => {
		const filtered = data.filter((item) => {
			const itemDate = new Date(item.date);
			return itemDate >= startDate && itemDate <= endDate;
		});

		filtered.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateA - dateB;
		});

		return filtered;
	};

	const handleApplyDateRange = () => {
		if (selectedStartDate && selectedEndDate) {
			const filteredAndSortedData = filterAndSortData(selectedStartDate, selectedEndDate);
			setFilteredData(filteredAndSortedData);
		}
	};

	return (
		<div className=" flex bg-green-100 font-helvetica-neue ">
			<div className=" w-60 h-screen bg-[#181818] flex flex-col items-center text-white sticky top-0 left-0">
				<div>Logo</div>
				<div className="flex flex-col gap-2 p-3 border-y border-[#2c2c2c]">
					<p className=" text-gray-500">DATA-IN</p>
					<div id="energy" className=" hover:cursor-pointer" onClick={toggleEnergyObjects}>
						Energy
					</div>
					{showEnergyObjects && (
						<div>
							<p className="border border-gray-500 rounded-2xl p-1">Object 1</p>
							<p className="border border-gray-500 rounded-2xl p-1">Object 1</p>
							<p className="border border-gray-500 rounded-2xl p-1">Object 1</p>
						</div>
					)}
					<div>Water and Effluents</div>
				</div>
				<div className=" flex flex-col gap-3">
					<p className="text-gray-500">ANALYZE</p>
					<div>Energy</div>
					<div>Waste</div>
				</div>
				<div className=" h-32 flex items-center justify-center ">
					<button className=" bg-[#02AB6C] rounded-xl p-4">Open Help Centre</button>
				</div>
			</div>
			<div className=" flex-auto">
				<Header />
				<div className="  px-5">
					<div className=" flex gap-1 my-6">
						{/* Date picker for start date */}
						<DatePicker
							selected={selectedStartDate}
							onChange={(date) => setSelectedStartDate(date)}
							dateFormat="dd-MM-yyyy"
							placeholderText="Select start date"
						/>
						{/* Date picker for end date */}
						<DatePicker
							selected={selectedEndDate}
							onChange={(endDate) => setSelectedEndDate(endDate)}
							dateFormat="dd-MM-yyyy"
							placeholderText="Select end date"
							minDate={selectedStartDate} // Setting minDate based on selectedStartDate
						/>
						{/* Button to apply date range filter */}
						<button
							className=" p-1 w-12 rounded-2xl bg-green-600 text-white border border-green-400"
							onClick={handleApplyDateRange}
						>
							filter
						</button>
					</div>

					<div className="h-36 flex gap-2 ">
						<div className=" flex flex-col justify-around px-3 rounded-lg w-48 bg-white">
							Purchased goods and Services
							<div className=" bg-green-50 rounded-lg px-3 border-l-4 border-green-400">40000</div>
						</div>
						<div className=" flex flex-col justify-around p-4 rounded-lg w-48 bg-white">
							Purchased goods and Services to revenue ratio
							<div className=" bg-orange-50 rounded-lg px-3 border-l-4 border-orange-400">
								40000
							</div>
						</div>
						<div className=" flex flex-col justify-around p-4 rounded-lg w-48 bg-white">
							Category-1
							<div className=" bg-red-50 rounded-lg px-3 border-l-4 border-red-400">
								32% of Scope3
							</div>
						</div>
						<div className=" rounded-lg w-48 text-white bg-green-400 flex flex-col items-center justify-center text-center">
							<p>Total numbers of reached suppliers</p>
							<p className=" text-5xl">140</p>
						</div>
					</div>
					<div className=" bg-white p-2">
						<div className="p-2 border border-[#EBEBEB] rounded-xl">
							<CombinedChart data={filteredData ? filteredData : data} width={400} height={400} />
						</div>
						<div className=" flex justify-between gap-2 my-2">
							<div>
								<div className=" w-full border border-[#EBEBEB] rounded-xl mb-2">
									<div>Top 3 Suppliers contributing </div>
									<div className=" flex gap-1 ">
										<div className=" flex items-center gap-1 ">
											<div className=" rounded-full w-3 h-3 bg-green-300"></div>
											<div>
												Supplier-1 <span>64%</span>
											</div>
										</div>
										<div className=" flex items-center gap-1">
											<div className=" rounded-full w-3 h-3 bg-amber-600"></div>
											<div>
												Supplier-2 <span>32%</span>
											</div>
										</div>
										<div className=" flex items-center gap-1">
											<div className=" rounded-full w-3 h-3 bg-green-700"></div>
											<div>
												Supplier-3 <span>15%</span>
											</div>
										</div>
									</div>
								</div>
								<div className=" p-2 border border-[#EBEBEB] rounded-xl">
									<DoughnutChart data={filteredData ? filteredData : data} />
								</div>
							</div>
							<div>
								<div className="p-2 border border-[#EBEBEB] rounded-xl">
									<Table data={filteredData ? filteredData : data} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
