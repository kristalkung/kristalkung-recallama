"use strict";


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
  