"use strict";

function SignUp() {

  let history = useHistory();

  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

	function handleSignUp(evt) {
		evt.preventDefault();
		
		// make a data option and put your email and password in it
		const data = {
      fname: fname,
      lname: lname,
			email: email,
			password: password
		}

		const options = {
			"method": "POST",
			headers: {
				"Content-Type": "application/json"
				// tells the server during the post that this is a json string
			},
			// turn data into JSON
			body: JSON.stringify(data)
		}
		
		fetch("/api/signup", options)
		.then(response => response.json())  //gets response from server and makes into json
    .then(data => {
      if (data === "email used") {
        alert("This email has already been used. Please use a different email.")
      } else {
        console.log(data)
        history.push("/login")
        // redirects user to the login page
      }
      
    })
		
	}

  function handleFNameChange(evt) {
    setFName(evt.target.value)
  }

  function handleLNameChange(evt) {
    setLName(evt.target.value)
  }

  function handleEmailChange(evt) {
		setEmail(evt.target.value)
	}

	function handlePasswordChange(evt) {
		setPassword(evt.target.value)
	}

  return (
    <div> 
      <h2>
      Signup for a Recallama account 
      </h2>
      <form className='signUpForm' onSubmit={handleSignUp}>
        First name:
				<input value={fname} onChange={handleFNameChange} type="text"></input>
        <br/>

        Last name:
				<input value={lname} onChange={handleLNameChange} type="text"></input>
        <br/>

        Email:
				<input value={email} onChange={handleEmailChange} type="text"></input>
				<br/>
        
        Password:
				<input value={password} onChange={handlePasswordChange} type="text"></input>
        <br/>

				<button type="submit">Sign up</button>
			</form>
      <br/>
      <a href='/login'>Already have an account? Click here to login.</a>
    </div>
  )
}