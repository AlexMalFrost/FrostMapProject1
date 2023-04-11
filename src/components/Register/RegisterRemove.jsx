import "./RegisterRemove.css";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";

export default function RegisterRemove({currentUsername, setCurrentUsername, myStorage}) {
	const [showRegister, setShowRegister] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const removeUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setError(false);
      setSuccess(true);
      if ( currentUsername === usernameRef.current.value) {
      	setCurrentUsername( null );
      	myStorage.removeItem("user");
      	await axios.post("/users/remove", removeUser);
				} else {
				await axios.post("/users/remove", removeUser);
			  };
    } catch (err) {
      setError(true);
    }
  };
	return (
		<>
		<div className="removebutton">
		  <button onClick={() => setShowRegister(true)} className="myremovebutton">
		    Удалить пользователя
		  </button>
		</div>
		{showRegister && <div className="removeContainer">
			<div className="removelogo"><Room />Remove</div>
				<form onSubmit={handleSubmit}>
				  <input autoFocus placeholder="username" ref={usernameRef} />
				  <input
				  type="password"
				  min="6"
				  placeholder="password"
				  ref={passwordRef}
					/>
					<button className="removeBtn" type="submit">
					  Remove
					</button>
				</form>
				<div className="mysspace"></div>
				{success && <span className="success">Success. User is removed</span> }
        {error && <span className="failure">Something went wrong!</span>}
				<Cancel 
				  className="removeCancel"
          onClick={() => setShowRegister(false)} />
		</div>}
		</>
	);
}
