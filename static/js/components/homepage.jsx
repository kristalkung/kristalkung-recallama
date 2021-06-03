"use strict";


function Homepage() {
	return (
		<div>
			<div className="py-3 text-center">
				<h1>
					Welcome to Recallama
				</h1>
			</div>
			<div className="row">
				<div className="col-4"></div>
				<div className="bubble col-2 ">
					Hello, I'm Recallama! <br/>
					I can help you search <br/>
					for FDA recalls.
				</div>
				<div className="col-6 mascot">
					<img src="static/img/recallama-bg.jpg"/>
				</div>
				{/* <div className="col-3"> </div> */}
			</div>
		</div>
	  
	)
}



