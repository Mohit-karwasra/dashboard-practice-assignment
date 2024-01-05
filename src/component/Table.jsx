import React from "react";

const Table = ({ data }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="text-left py-2 px-3 uppercase font-semibold text-sm">Supplier</th>
						<th className="text-left py-2 px-3 uppercase font-semibold text-sm">Year</th>
						<th className="text-left py-2 px-3 uppercase font-semibold text-sm">
							Emission Revenue Ratio (ER)
						</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{data.map((entry, index) => (
						<tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
							<td className="py-2 px-3">{entry.supplier}</td>
							<td className="py-2 px-3">{entry.year}</td>
							<td className="py-2 px-3">{entry.er}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
