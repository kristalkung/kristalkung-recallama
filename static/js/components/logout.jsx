"use strict";

function LogOut() {

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
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

    <form action='/api/logout' onSubmit={handleSubmit}>
      <p>Are you sure you want to log out?</p>
      <button type='submit' name='yes' onClick={handleYes}> Yes </button>
      <button type='submit'name='no' onClick={handleNo}> No </button>

    </form>
  )
    

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
      console.log('successfully logged user out')
      alert('log out success')
      
      history.go(0)

    }
    else {
      console.log(data)
      alert('log out failed')
    }
  })
}