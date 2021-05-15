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
		<div>
      <h2>Login to your Recallama Account</h2>
			<form action="/api/login" method="POST">
				Email:
				<input value={email} name="email" onChange={handleEmailChange} type="text"></input>
        <br/>

				Password:
				<input value={password} name="password" onChange={handlePasswordChange} type="text"></input>
        <br/>

				<button type="submit">Login</button>
			</form>
			< br />
        <a href='/signup'>Don't have an account? Click here to sign up.</a>
		</div>
	)
}