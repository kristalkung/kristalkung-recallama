"use strict";


function ViewProfile() {
  

  function ViewFavorites() {
    const [favorites, setFavorites] = React.useState(null);
    let {user_id}  = useParams();
    
    React.useEffect(() => {

      const data = {
        user_id
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
      <div>{favorites}</div>
    )
  }

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
  