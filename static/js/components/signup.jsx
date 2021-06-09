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
        alert("Success! Please log in to continue.")
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
    <div className="signup-form"> 
      <h2>
      Sign up for an Account 
      </h2>
      <form className='signUpForm' onSubmit={handleSignUp}>
        <div className="form-group row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <input className="input-item form-control" value={fname} name="fname" onChange={handleFNameChange} type="text" placeholder="First Name" required></input>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <input className="input-item form-control" value={lname} name="lname" onChange={handleLNameChange} type="text" placeholder="Last Name" required></input>
          </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <input className="input-item form-control" value={email} name="email" onChange={handleEmailChange} type="text" placeholder="email" required></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <input className="input-item form-control" value={password} name="password" onChange={handlePasswordChange} type="password" placeholder="password" required></input>
            </div>
          </div>
			  <button type="submit" className="btn btn-submit">Sign up</button>
			</form>
      <br/>
      <a href="/login" className="link-to">Already have an account? Click here to login.</a>
    </div>
  )
}