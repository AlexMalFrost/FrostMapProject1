import "./Warning.css";
import { Cancel, Room } from "@material-ui/icons";
import { useRef, useState } from "react";

export default function Warning({ setShowWarning }) {
	return (
		<div className="myregisterContainer">
			<div className="mylogo"><Room />Please Login</div>
			<Cancel className="myregisterCancel" onClick={() => setShowWarning(false)} />
		</div>
	);
}