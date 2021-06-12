"use strict";


function Homepage() {
	return (
		<div>
			<div className="py-3 text-center">
				<h1 className="welcome-banner">
					Welcome to Recallama
				</h1>
			</div>
			<div className="row">
				<div className="col-4"></div>
				<div className="bubble col-2 text-center">
					Hello! I'm Recallama and <br/>
					I can help you search for FDA drug and food recalls.
				</div>
				<div className="col-6 mascot">
					<img src="static/img/recallama.png"/>
				</div>
				
			</div>
		</div>
	  
	)
}



