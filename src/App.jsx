import { useEffect, useState } from "react";
import Dashboard from "./component/Dashboard";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("/data.json");
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);
	return <Dashboard data={data} />;
}

export default App;
