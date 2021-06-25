"use strict";

function LogOut() {

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleYes() {
    const data = {
      logout: 'yes'
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
  
    fetch('/api/logout', options)
    .then(response => response.json())
    .then(data => {
      if (data === "log out successful") {
        history.go(0)
  
      }
      else {
        history.push('/profile')
      }
    })
  }
  
  function handleNo() {
    const data = {
      logout: 'no'
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
  
    fetch('/api/logout', options)
    .then(response => response.json())
    .then(data => console.log(data))
    history.push('/profile')
  }

  return (

    <div className="logout-form">
      <form action='/api/logout' onSubmit={handleSubmit}>
      <h4>Are you sure you want to log out?</h4>
      <button className="btn btn-submit mr-2" type='submit' name='yes' onClick={handleYes}> Yes </button>
      <button className="btn btn-submit mr-2" type='submit'name='no' onClick={handleNo}> No </button>

      </form>
    </div>
  )
}

