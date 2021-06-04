"use strict";

function LogIn() {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function handleEmailChange(evt) {
		setEmail(evt.target.value)
	}

	function handlePasswordChange(evt) {
		setPassword(evt.target.value)
	}
	return (
		<div className="login-form">
      <h2>Login to your Account</h2>
			<form action="/api/login" method="POST">
				<div className="form-input">
          <input className="input-item" value={email} name="email" onChange={handleEmailChange} type="text" placeholder="email" required></input>
        </div>
				<div className="form-input">
          <input className="input-item" value={password} name="password" onChange={handlePasswordChange} type="password" placeholder="password" required></input>
        </div>
        
				<button className="btn btn-submit" type="submit">Login</button>
			</form>
			< br />
        <a href="/signup" className="link-to">Don't have an account? Click here to sign up.</a>
		</div>
	)
}