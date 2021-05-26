// for React

// const { useReducer } = require("react");

// const { useEffect } = require("react");

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useHistory = ReactRouterDOM.useHistory;
const useParams = ReactRouterDOM.useParams;

// const { Router, Route, Link, Prompt, Switch, Redirect } = ReactRouterDOM;


function App() {

  if (window.user_id) {

    return (
      <Router>
			<div>

				{/* this is the nav bar */}
        <nav>
          <ul>
            <li> <Link to='/'>Home</Link></li>
            <li> <Link to='/logout'>Logout</Link></li>
            <li> <Link to='/search/food'>Search</Link></li>
            <li> <Link to='/profile'>View my profile</Link></li>
          </ul>
        </nav>
		
				{/* this is how you switch between two components */}
				<Switch>
					<Route path='/logout'> <LogOut /> </Route>
          <Route path='/profile'> <ViewProfile /> </Route>
					<Route path='/search/food'> <SearchFood /> </Route>
          <Route path='/search/drug'> <SearchDrug /> </Route>
					<Route path='/food/:food_id'> <FoodResults /> </Route>
          <Route path='/drugs/:drug_id'> <DrugResults /> </Route>
					<Route path='/'> <Homepage /> </Route>

				</Switch>
			</div>
		</Router>
    )

  }

  else {
    return (
      <Router>
        <div>
  
          {/* this is the nav bar */}
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/signup'>Sign up</Link></li>
              <li><Link to='/search/food'>Search</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/profile'>View my profile</Link></li>
            </ul>
          </nav>
      
          {/* this is how you switch between two components */}
          <Switch>
            <Route path='/signup'> <SignUp /> </Route>
            <Route path='/login'> <LogIn /> </Route>
            <Route path='/profile'> <ViewProfile /> </Route>
            <Route path='/search/food'> <SearchFood /> </Route>
            <Route path='/search/drug'> <SearchDrug /> </Route>
            <Route path='/food/:food_id'> <FoodResults /> </Route>
            <Route path='/drugs/:drug_id'> <DrugResults /> </Route>
            <Route path='/'> <Homepage /> </Route>
  
          </Switch>
        </div>
      </Router>
  )
  }
	       
	
}

ReactDOM.render(<App />, document.getElementById('root'))
