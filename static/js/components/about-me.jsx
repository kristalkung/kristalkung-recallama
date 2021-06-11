"use strict";

function AboutMe() {
  return (
    <div>
      <h2 className="about-me-header text-center">✨About Me✨</h2>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-4">
          <img className="about-me-pic" src="/static/img/aboutme.jpg" />
        </div>
        <div className="about-me-text col-4">
        
          Hello! My name is Kristal. I am an analytical chemistry research associate working 
          in the alternative meat biotech industry and am looking to transition 
          into a software engineering role. My passion for the environment lead
          me to where I am today and I am now working towards my next career move 🌱
          <br />
          <br />

          I really enjoy the challenges of programming and love making my ideas 
          come to life. The problem solving aspect keeps me on my toes and I like 
          how the industry is constantly evolving to fit needs of world. A core 
          value of mine is to live while positively impacting the world. I believe 
          that stepping into software engineering will help me reach a wider audience 
          to fulfill that value 🌎

          <br />
          <br />
          
          In my free time, I enjoy cooking new recipes, eating at new restaurants, 
          taking long walks on the beach, reading in a park, running in 60 degree 
          weather, and finding the next best ice cream spot 🍦

          <br />
          <br />
          
          🔎 <u>Find me here:</u> 🔎
          <br />

          <img src="/static/img/github-icon.png" className="website-icon" /> 
          Github: <a className="link-to" href="https://github.com/kristalkung">https://github.com/kristalkung</a>
          
          <br />
          
          <img src="/static/img/linkedin-icon.png" className="website-icon" /> 
          LinkedIn: <a className="link-to" href="https://linkedin.com/in/kristal-kung">https://linkedin.com/in/kristal-kung</a>

        </div>
        <div className="col-1"></div>
      </div>
    </div>
  )
}