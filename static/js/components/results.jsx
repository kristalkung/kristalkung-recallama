function Results() {
  console.log("hello")

  const [result, setResult] = React.useState({})

  fetch('/api/food/{food_id}')
  .then(response => response.json())
  .then(data => setResult(data))

  return (
    <div className='individualRecall'>
      <h3> {result.recalling_firm}</h3>
      <p>Report Date: {result.report_date}</p>
      <p>Description: {result.product_description}</p>
      <p>Distribution pattern: {result.distribution_pattern}</p>
      <p>Reason for recall: {result.reason_for_recall}</p>
      <p>Status: {result.status}</p>
    </div>
      
  )
}

ReactDOM.render(<Results />, document.getElementById('root'))
