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
        status: props.status,
        reasonForRecall: props.reasonForRecall,
        recallingFirm: props.recallingFirm,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      fetch('/api/results', options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
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
            <p>Description: {result.product_description}</p>
            <p>Distribution pattern: {result.distribution_pattern}</p>
            <p>Reason for recall: {result.reason_for_recall}</p>
            <p>Status: {result.status}</p>
            <a href='/api/<food_id>'>View Details</a>
          </div>))
        }
      </div>
    )
  }
}

function SearchBar(props) {

  const [ description, setDescription ] = React.useState("")
  const [ status, setStatus ] = React.useState("")
  const [ reasonForRecall, setReasonForRecall ] = React.useState("")
  const [ recallingFirm, setRecallingFirm ] = React.useState("")
  const [searched, setSearched] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    const data = {
      description,
      status,
      reasonForRecall,
      recallingFirm
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch('/api/results', options)
    .then(response => {
      console.log('first then response: ' + response);
      setSearched(true);
    })
    .catch(err => {
      console.log(`search failed due to ${err}`);
    });
  }

	return (
    <div>
      <div className='search-bar-container'>
        <form action='/api/results' onSubmit={(evt) => {handleSubmit(evt)}} method="POST">
          Food Description
          <input value={description} name="description" onChange={(e) => setDescription(e.target.value)} type='text'></input>
          <br/>

          Recall Termination Status
          <input value={status} name="status" onChange={(e) => setStatus(e.target.value)} type='text'></input>
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
        <PostResult search={searched} setSearch={setSearched} description={description} status={status} reasonForRecall={reasonForRecall} recallingFirm={recallingFirm} />
      </div>
    </div>

	)
}

function Search() {

  return (
    <div> 
      <WelcomeUser/>
      <h3>Search for recalls </h3>
      <SearchBar />
      
      
    </div>
  )  
}





// function PostResultItem(props) {
//   return <li>{props.recallingFirm}</li>
// }

// function HandleSubmit(e) {
//   e.preventDefault();

// }


// function SearchBar() {

//   const [ description, setDescription ] = React.useState("")
//   const [ status, setStatus ] = React.useState("")
//   const [ reasonForRecall, setReasonForRecall ] = React.useState("")
//   const [ recallingFirm, setRecallingFirm ] = React.useState("")

//   function handleSubmit(evt) {
//     evt.preventDefault();

//     // React.useEffect(() => {
//     //   fetch('/api/results')
//     //   .then(response => response.json())
//       // .then(data => {
//         // const postResults = []
//         // for (const post of data) {
//         //   postResults.push(<PostResultItem title={post.recallingFirm} />);
//         // }
//         // setResultsList(postResults)
//       // })
//     // }, [])

//     return (
//       <div>
//         <Search />
//         <ul>
//           {resultsList}
//         </ul>
//       </div>
//     )
//   }


// 	return (
// 		<div>
//       <form action='/api/results' onSubmit={handleSubmit} method="POST">
//         Food Description
//         <input value={description} name="description" onChange={(e) => setDescription(e.target.value)} type='text'></input>
//         <br/>

//         Recall Termination Status
//         <input value={status} name="status" onChange={(e) => setStatus(e.target.value)} type='text'></input>
//         <br/>
        
//         Reason for Recall 
//         <input value={reasonForRecall} name="reason-for-recall" onChange={(e) => setReasonForRecall(e.target.value)} type='text'></input>
//         <br/>

//         Recalling Firm
//         <input value={recallingFirm} name="recalling-firm" onChange={(e) => setRecallingFirm(e.target.value)} type='text'></input>
//         <br/>
//         <button type="submit">Search</button>
//       </form>
			
// 		</div>
// 	)
// }

// // function PostResults(props) {
// //   // const [resultsList, setResultsList] = React.useState(["loading..."])
// //   const resultsList = <PostResultItem recallingFirm="test" />

// //   React.useEffect(() => {
// //     fetch('/api/results')
// //     .then(response => response.json())
// //     .then(data => {
// //       const postResults = []
// //       for (const post of data) {
// //         postResults.push(<PostResultItem title={post.recallingFirm} />);
// //       }
// //       setResultsList(postResults)
// //     })
// //   }, [])

// //   return (
// //     <div>
// //       <Search />
// //       <ul>
// //         {resultsList}
// //       </ul>
// //     </div>
// //   )


// // }

// function Search() {
//     return (
//       <div> 
//         <WelcomeUser/>
//         <h3>Search for recalls </h3>
//         <SearchBar/>
//       </div>

//     )  
// }