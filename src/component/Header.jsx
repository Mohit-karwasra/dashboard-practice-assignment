import React from "react";
import avatar from "../assets/cat.png";

const Header = () => {
	return (
		<div className=" p-5 flex justify-between">
			<div>Category-1</div>
			<div className=" w-6 h-6 rounded-full">
				<img src={avatar} alt="avatar" />
			</div>
		</div>
	);
};

export default Header;
