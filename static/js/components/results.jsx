
function RecallField(props) {
	return <li>{props.code_info}</li>
}

function Results(props) {
  console.log("hello results function rendered")

  let {food_id}  = useParams();

  const [recallData, setRecallData] = React.useState(null);

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

  console.log(recallData);

  if (recallData === null) {
    return <div>no data</div>;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('save to profile was clicked')
  }

  return (
    <div className='individualRecall'>
      <h3> {recallData.recalling_firm}</h3>
      <p>Report Date: {recallData.report_date}</p>
      <p>Description: {recallData.product_description}</p>
      <p>Distribution pattern: {recallData.distribution_pattern}</p>
      <p>Reason for recall: {recallData.reason_for_recall}</p>
      <p>Status: {recallData.status}</p>
      <button>Save to Profile</button>
    </div>
    // <div>
    //   <p>this is the result</p>
    //   <div>{recallData.code_info}</div>
    // </div>
      
  )
}


