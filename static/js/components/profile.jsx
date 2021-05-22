"use strict";


function ViewProfile() {

    if (window.user_id) 
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
    else return <h2> Please log in to view your profile.</h2>
  }
  
function ViewFavorites() {
  const [favorites, setFavorites] = React.useState(null);
  
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
    return <div>no data</div>;
  }

  return (
    <div className='favoriteIndex'>
      {favorites.map((result, index) => (
        <div key={index}>
          <h3>{result.recalling_firm}</h3>
          <p>{result.description}</p>
          <p>{result.comment}</p>
          <Link to={'/food/' + result.food}>View Details</Link>
        </div>
      ))
      }
    </div>
  )
}