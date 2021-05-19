function Results() {

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
