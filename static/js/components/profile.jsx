"use strict";


function ViewProfile() {

    if (window.user_id) {
      return (
        <div>
          <h2 className="user-name-index text-center">{window.user_name}'s Saved Recalls</h2>

          <div>
            <ViewFavorites />
          </div>
        </div>
      )
    }
    
    else return <h4 className="not-logged-in col-4 text-center"> Please log in to view your profile.</h4>
  }
  
function ViewFavorites() {
  const [favorites, setFavorites] = React.useState(null);

  function HandleUnsave(favorite_id) {

  
    const data = {
      favorite_id,
      
    }
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
    return <div className="no-saved-recalls text-center col-4">You have no saved recalls</div>;
  }
  else {
    return (
      <div className='favoriteIndex text-center'>
        {favorites.map((result, index) => (
          
          <div className="favorite-index-item col-8" key={index}>
            <h3>{result.recalling_firm}</h3>
            <p> <b>Description:</b> {result.description.slice(0, 100)}...</p>
            <p> <b>My comment:</b>   {result.comment}</p>
            <Link className="link-to" to={'/' + result.product_type + '/' + result.id}>View Details</Link>
            <br/>
            <button className="btn btn-submit" type='submit' onClick={() => HandleUnsave(result.favorite_id)}>Unsave</button>
          </div>
        ))
        }
      </div>
    )
  }
  
}

