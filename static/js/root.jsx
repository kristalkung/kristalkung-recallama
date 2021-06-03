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

// import Nav from 'react-bootstrap/Nav';

// const { Router, Route, Link, Prompt, Switch, Redirect } = ReactRouterDOM;


function App() {

  if (window.user_id) {

    return (
      <Router>
			<div>
        
				{/* this is the nav bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src="/static/img/recallama-icon.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
            Recallama</a>
          <ul className="nav navbar-nav">
            <li className="nav-item px-3"> <Link to='/'>Home</Link></li>
            <li className="nav-item px-3"> <Link to='/logout'>Logout</Link></li>
            <li className="nav-item px-3"> <Link to='/search/food'>Search</Link></li>
            <li className="nav-item px-3"> <Link to='/profile'>View my profile</Link></li>
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
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/" className="navbar-link">
              <img src="/static/img/cropped.png" width="30" height="30" className="d-inline-block align-center" alt="" />
              Recallama</a>
            <ul className="nav navbar-nav">
              <li className="nav-item px-3 navbar-dark"><Link to='/' className="navbar-link">Home</Link></li>
              <li className="nav-item px-3 navbar-dark"><Link to='/signup' className="navbar-link">Sign up</Link></li>
              <li className="nav-item px-3 navbar-dark"><Link to='/search/food' className="navbar-link">Search</Link></li>
              <li className="nav-item px-3 navbar-dark"><Link to='/login' className="navbar-link">Login</Link></li>
              <li className="nav-item px-3 navbar-dark"><Link to='/profile' className="navbar-link">View my profile</Link></li>
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
