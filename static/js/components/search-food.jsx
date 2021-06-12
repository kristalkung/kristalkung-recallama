"use strict";

// function WelcomeUser() {
//   if (window.user_id) return <h2>Welcome {window.user_name}!</h2>
//   else  return <h2> Welcome!</h2>
// }

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
    return <div className="individual-recall col-8 text-center">{postResultData['error']['message']}</div>
  } else {
    return (
      <div className='resultIndex'>
        {postResultData['results'].map((result, index) => (
          <div className="individual-recall col-8" key={index}>
            <h3 className="text-center"> <b>{result.recalling_firm}</b> </h3>
            <p className="recall-field"> <b>Report Date:</b> {result.report_date}</p>
            <p className="recall-field"> <b>Recall Number:</b> {result.recall_number}</p>
            <p className="recall-field"> <b>Description:</b> {result.product_description}</p>
            <p className="recall-field"> <b>Distribution pattern:</b> {result.distribution_pattern}</p>
            <p className="recall-field"> <b>Reason for recall:</b> {result.reason_for_recall}</p>
            <p className="recall-field"> <b>Status:</b> {result.status}</p>
            <div className="text-center">
            <Link className="link-to" to={'/food/' + result.food_id}>View Details</Link>
            </div>
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
      <div className='food-search-bar-container'>
        <h3 className="searchbar-header text-center">Search for food recalls </h3>
        <form action='/api/food-results' onSubmit={(evt) => {handleSubmit(evt)}} method="POST">
          <div className="form-group row">
            <div className="col-sm-1"></div>
            <label for="description" className="col-sm-4 col-form-label px-0 text-left">Description</label>
            <div className="col-sm-6">
              <input className="input-item form-control" value={description} name="description" onChange={(e) => setDescription(e.target.value)} type='text'></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-1"></div>
            <label for="description" className="col-sm-4 col-form-label text-left px-0">Reason for Recall</label>
            <div className="col-sm-6">
              <input className="input-item form-control" value={reasonForRecall} name="reason-for-recall" onChange={(e) => setReasonForRecall(e.target.value)} type='text'></input>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-1"></div>
            <label for="description" className="col-sm-4 col-form-label text-left px-0">Recalling Firm</label>
            <div className="col-sm-6">
              <input className="input-item form-control" value={recallingFirm} name="recalling-firm" onChange={(e) => setRecallingFirm(e.target.value)} type='text'></input>
            </div>
          </div>
          <button className="btn btn-submit" type="submit">Search</button>
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
      <FoodSearchBar />
    </div>
  )  
}

