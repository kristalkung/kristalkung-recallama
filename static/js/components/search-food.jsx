"use strict";

function WelcomeUser() {
  if (window.user_id) return <h2>Welcome {window.user_name}!</h2>
  else  return <h2> Welcome!</h2>
}

function PostResult(props) {
  const [postResultData, setPostResultData] = React.useState(null)
  
  React.useEffect(() => {
    if (props.search) {
      const data = {
        description: props.description,
        field: props.field,
        reasonForRecall: props.reasonForRecall,
        recallingFirm: props.recallingFirm,
      };
      console.log(data)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      fetch('/api/food-results', options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data)
        setPostResultData(data);
      })
      .catch(err => {
        console.log(`search failed due to ${err}`);
      });
      props.setSearch(false);
    }
    
  }, [props.search])

  if (postResultData === null) {
    return <div></div>;
  }

  const wasThereAnError = postResultData['error'] !== null;

  if (wasThereAnError) {
    return <div className='resultIndex'>
      {postResultData['error']['message']}
    </div>
  } else {
    return (
      <div className='resultIndex'>
        {postResultData['results'].map((result, index) => (
          <div key={index}>
            <h3> {result.recalling_firm}</h3>
            <p>Report Date: {result.report_date}</p>
            <p>Recall Number: {result.recall_number}</p>
            <p>Description: {result.product_description}</p>
            <p>Distribution pattern: {result.distribution_pattern}</p>
            <p>Reason for recall: {result.reason_for_recall}</p>
            <p>Status: {result.status}</p>
            <Link to={'/food/' + result.food_id}>View Details</Link>
          </div>))
        }
      </div>
    )
  }
}

function FoodSearchBar() {

  const [ description, setDescription ] = React.useState("");
  const [ reasonForRecall, setReasonForRecall ] = React.useState("");
  const [ recallingFirm, setRecallingFirm ] = React.useState("");
  const [searched, setSearched] = React.useState(false);
  // const [ field, setField ] = React.useState("productDescription");

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    const data = {
      description,
      reasonForRecall,
      recallingFirm,
      // field
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch('/api/food-results', options)
    .then(response => {
      setSearched(true);
      // console.log(response)
    })
    .catch(err => {
      console.log(`search failed due to ${err}`);
    });
  }

	return (
    <div>
      <div className='search-bar-container'>
        <form action='/api/food-results' onSubmit={(evt) => {handleSubmit(evt)}} method="POST">
          Food Description
          <input value={description} name="description" onChange={(e) => setDescription(e.target.value)} type='text'></input>
          <br/>
          
          Reason for Recall 
          <input value={reasonForRecall} name="reason-for-recall" onChange={(e) => setReasonForRecall(e.target.value)} type='text'></input>
          <br/>

          Recalling Firm
          <input value={recallingFirm} name="recalling-firm" onChange={(e) => setRecallingFirm(e.target.value)} type='text'>
          </input>
          <br/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className='post-result-container'>
        <PostResult search={searched} setSearch={setSearched} description={description} reasonForRecall={reasonForRecall} recallingFirm={recallingFirm} />
      </div>
    </div>

	)
}

function SearchFood() {

  return (
    <div> 
      <WelcomeUser/>
      <a href='/search/drug'>Click here to search for drug recalls</a>
      <h3>Search for food recalls </h3>
      <FoodSearchBar />
    </div>
  )  
}

