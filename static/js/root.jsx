// for React

// const { useEffect } = require("react");

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;

// const { Router, Route, Link, Prompt, Switch, Redirect } = ReactRouterDOM;

function WelcomeUser() {
  if (window.user_id) return <h2>Welcome {window.user_name}!</h2>
  else  return <h2> Welcome!</h2>
}

function Homepage() {
	return (
	  <div>
		<h1>
		  Welcome to Recallama
		</h1>
	  </div>
	)
}

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
		
    // TODO: figure out how to let the user know on the webpage the error of a taken email
    // TODO: figure out a new user.
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

function ViewProfile() {
  if (window.user_id) 
  return (
    <div>
      <h2>{window.user_name}</h2>
      <div>
        Here are your saved recalls:
      </div>
    </div>
  )
  else return <h2> You are not logged in.</h2>
}
// function PostResultItem(props) {
//   return <li>{props.city}</li>
// }



function PostResult(props) {
  const [postResultData, setPostResultData] = React.useState(["loading..."])
  
  React.useEffect(() => {
    if (props.search) {
      const data = {
        description: props.description,
        status: props.status,
        reasonForRecall: props.reasonForRecall,
        recallingFirm: props.recallingFirm
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      fetch('/api/results', options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPostResultData(data);
      })
      .catch(err => {
        console.log(`search failed due to ${err}`);
      });
    }
    props.setSearch(!props.search);
  }, [props.search])


  return (
    <div className='resultIndex'>
      {postResultData.map((result, index) => (
        <div key={index}>
          <h3> {result.recalling_firm}</h3>
          <p>Report Date: {result.report_date}</p>
          <p>Description: {result.product_description}</p>
          <p>Distribution pattern: {result.distribution_pattern}</p>
          <p>Status: {result.status}</p>
          <button type='submit'>Save to Profile</button>
        </div>
        
      ))}
    </div>
  )
}

function SearchBar(props) {

  const [ description, setDescription ] = React.useState("")
  const [ status, setStatus ] = React.useState("")
  const [ reasonForRecall, setReasonForRecall ] = React.useState("")
  const [ recallingFirm, setRecallingFirm ] = React.useState("")
  const [searched, setSearched] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    const data = {
      description,
      status,
      reasonForRecall,
      recallingFirm
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch('/api/results', options)
    .then(response => {
      console.log('first then response: ' + response);
      setSearched(true);
    })
    .catch(err => {
      console.log(`search failed due to ${err}`);
    });
  }

	return (
    <div>
      <div className='search-bar-container'>
        <form action='/api/results' onSubmit={(evt) => {handleSubmit(evt, resultsList)}} method="POST">
          Food Description
          <input value={description} name="description" onChange={(e) => setDescription(e.target.value)} type='text'></input>
          <br/>

          Recall Termination Status
          <input value={status} name="status" onChange={(e) => setStatus(e.target.value)} type='text'></input>
          <br/>
          
          Reason for Recall 
          <input value={reasonForRecall} name="reason-for-recall" onChange={(e) => setReasonForRecall(e.target.value)} type='text'></input>
          <br/>

          Recalling Firm
          <input value={recallingFirm} name="recalling-firm" onChange={(e) => setRecallingFirm(e.target.value)} type='text'>
          </input>
          <br/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className='post-result-container'>
      <PostResult search={searched} setSearch={setSearched} description={description} status={status} reasonForRecall={reasonForRecall} recallingFirm={recallingFirm} />
      </div>


    </div>

	)
}

function Search() {

  return (
    <div> 
      <WelcomeUser/>
      <h3>Search for recalls </h3>
      <SearchBar />
      
      
    </div>
  )  
}

function App() {
	return (
		<Router>
			<div>

				{/* this is the nav bar */}
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
						<Link to='/signup'>Sign up</Link>
						</li>
						<li>
						<Link to='/search'>Search</Link>
						</li>
						<li>
						<Link to='/login'>Login</Link>
						</li>
            <li>
						<Link to='/profile'>View my profile</Link>
						</li>

					</ul>
				</nav>
		
				{/* this is how you switch between two components */}
				<Switch>
					<Route path='/signup'>
						<SignUp />
					</Route>
					<Route path='/login'>
						<LogIn />
					</Route>
          <Route path='/profile'>
						<ViewProfile />
					</Route>
					<Route path='/search'>
						<Search />
					</Route>
					<Route path='/'>
						<Homepage />
					</Route>

				</Switch>
			</div>
		</Router>       
	);
}

ReactDOM.render(<App />, document.getElementById('root'))
