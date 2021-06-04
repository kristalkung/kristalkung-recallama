"use strict";


function ViewProfile() {

    if (window.user_id & window.user_id != "null") {
      return (
        <div>
          <h2>{window.user_name}</h2>
          <div>
            Here are your saved recalls:
          </div>
          <div>
            <ViewFavorites />
          </div>
        </div>
      )
    }
    
    else return <h2> Please log in to view your profile.</h2>
  }
  
function ViewFavorites() {
  const [favorites, setFavorites] = React.useState(null);

  function HandleUnsave(favorite_id) {
  
    const data = {
      favorite_id,
      
    }
    console.log(favorite_id)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
  
    fetch('/api/unsave', options)
    .then(response => response.json())
    .then(data => {
      setFavorites(data)
      }
  )
  }
  
  React.useEffect(() => {

    const data = {
      user_id
    };

    const options = {
      method: 'GET'
    };

    fetch(`/api/profile/${user_id}`, options)
    .then(response => response.json())
    .then(data => setFavorites(data))
    .catch(error => {
      console.error('error', error);
    })
  }, [user_id])

  if (favorites === null) {
    return <div>You have no saved recalls</div>;
  }

  return (
    <div className='favoriteIndex'>
      {favorites.map((result, index) => (
        <div key={index}>
          <h3>{result.recalling_firm}</h3>
          <p>Description {result.description}</p>
          <p>My comment: {result.comment}</p>
          <p>favorite id: {result.favorite_id}</p>
          <Link className="link-to" to={'/' + result.product_type + '/' + result.id}>View Details</Link>
          <br/>
          <button className="btn btn-submit" type='submit' onClick={() => HandleUnsave(result.favorite_id)}>Unsave</button>

        </div>
      ))
      }
    </div>
  )
}

