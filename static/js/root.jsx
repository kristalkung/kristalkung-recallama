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
