"use strict";

function DrugResults(props) {
  let {drug_id}  = useParams();

  const [recallData, setRecallData] = React.useState(null);
  const [ comment, setComment ] = React.useState("");
  const [ saveButton, setSaveButton ] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {
      drug_id,
      comment
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch('/save-drug-to-profile', options)
    .then(response => response.json())
    .then(data => {
      if (data === "favorite added") {
        alert('This recall was added to your profile!')
        setSaveButton(true);
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
      drug_id
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(`/api/drug/${drug_id}`, options)
    .then(response => response.json())
    .then(data => setRecallData(data))
    .catch(error => {
      console.error('error', error);
    })
  }, [drug_id])

  if (recallData === null) {
    return <div>no data</div>;
  }

  return (
    <div className="recall-container container">
      <div className="recall-item row"> 
        <div className="col-3"></div>
        <div className='recall-card col-6'>
          <h3 className="text-center"> {recallData.recalling_firm}</h3>
          <p> <b>Recall Initiation Date:</b> {recallData.recall_initiation_date}</p>
          <p> <b>Description:</b> {recallData.product_description}</p>
          <p> <b>Distribution pattern:</b> {recallData.distribution_pattern}</p>
          <p> <b>Reason for recall:</b> {recallData.reason_for_recall}</p>
          <p> <b>Status:</b> {recallData.status}</p>
          <p> <b>Classification:</b> {recallData.classification}</p>
        </div>
        <div className="save-recall col-3">
          <form action='/save-drug-to-profile' onSubmit={(evt) => handleSubmit(evt)} method='POST'>
            Want to save this to your profile?
            <br/>
            <textarea className="comment-box" name='comment' onChange={(e) => setComment(e.target.value)} placeholder="Add a comment"></textarea>
            <br/>
            <button className=" btn btn-submit btn-sm" disabled={saveButton}>Save to Profile</button>
          </form>
          <br/>
          <img className="email-icon" src='/static/img/gmail.png' />
          <a className="link-to" href={`mailto:?subject=Check out this Drug Recall from ${recallData.recalling_firm}&body=Hey! \nThought you might be interested in checking this out: http://localhost:5000/drug/${drug_id}`}>Send email</a>
        </div>
      </div>

    </div>
      
  )
}

