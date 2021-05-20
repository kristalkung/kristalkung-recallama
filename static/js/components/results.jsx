"use strict";

function Results(props) {
  let {food_id}  = useParams();

  const [recallData, setRecallData] = React.useState(null);
  const [ comment, setComment ] = React.useState("")

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {
      food_id,
      comment
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch('/save-to-profile', options)
    .then(response => response.json())
    .then(data => {
      if (data === "favorite added") {
        alert('This recall was added to your profile!')
      }
      else {
        alert('Please log in to save this recall to your profile')
      }
    })
    .catch(err => {
      console.log(`search failed due to ${err}`);
    });
  }

  React.useEffect(() => {

    const data = {
      food_id
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(`/api/food/${food_id}`, options)
    .then(response => response.json())
    .then(data => setRecallData(data))
    .catch(error => {
      console.error('error', error);
    })
  }, [food_id])

  if (recallData === null) {
    return <div>no data</div>;
  }

  return (
    <div>
      <div className='individualRecall'>
        <h3> {recallData.recalling_firm}</h3>
        <p>Report Date: {recallData.report_date}</p>
        <p>Description: {recallData.product_description}</p>
        <p>Distribution pattern: {recallData.distribution_pattern}</p>
        <p>Reason for recall: {recallData.reason_for_recall}</p>
        <p>Status: {recallData.status}</p>
      </div>
      <form action='/save-to-profile' onSubmit={(evt) => handleSubmit(evt)} method='POST'>
        Want to save this to your profile?
        <br/>
        Add a comment:
        <input type='text' name='comment' onChange={(e) => setComment(e.target.value)}></input>
        <button>Save to Profile</button>
      </form>
    </div>
      
  )
}


