import ProfilePic from '../images/JoshLutz289635.jpg'
import { Link } from 'react-router-dom';

import "./About.css";

function About () {
  return (    
    <section>
      <div className="top-banner" alt="Banner Image">
        <h2>MODEL THE FUTURE</h2>
      </div>
      <section className="our-purpose-container">
        <h1 className="about-header">Our Purpose</h1>
        <p className="leading">
          At <span style={{fontFamily: "Gloria Hallelujah, cursive"}}>nominal</span>, we are dedicated to connecting a community of 
          knowledge to advance your personal wealth, so you can spend more time with the things that matter.
        </p>
        <p>
          Whether you are progressing your career or busy developing a family, nominal connects like-minded investors to empower them 
          in advancing their financial goals.  The nominal community aims to provide scalable financial data modeling, ideas, and 
          support to enable research and analysis, putting the power of sound investment in your hands.
        </p>
        <p>
          <Link to="/login" className='about-link'>Connect</Link> today and elevate your portfolio to nominal!
        </p>
        
        <h1 className="about-header">The Team</h1>
        <section className="team-container">
          <div className="team-pic-container">
            <a href="https://lutz143.github.io/lutz143-efolio/" target="_blank" rel="noreferrer">
              <img className="team-pic" src={ProfilePic} alt="Website Founder"/>
            </a>
          </div>
          <div className="team-description">
            <p>
              Josh Lutz is the founder and architect of nominal.com.  He currently is a manager at a 
              leading defense firm where he utilizes his knowledge in data management, business analytics, 
              and machine learning to drive sound financial decisions.  His experience expands upon his 
              interest in providing a forum where community can enable investment ideas, leading to a nominal 
              approach in investing in a successful tomorrow.
            </p>
          </div>
        </section>

        <h1 className="about-header">Why It Matters</h1>
        <section className="team-container">
          <div>
            <p>
              Nominal's platform makes investment analysis easy with the incorporation of several machine learning and statistical techniques via python.  
              Nominal utilizes a value-based investment approach, mapping and forecasting key Discounted Cash Flow (DCF) metrics to derive Nominal (NOM), 
              Conservative (CON), and Compounded Annual Growth Rate (CAGR) positions to assess a stock price Confidence.
            </p>
            <p>
              In addition to DCF, nominal empowers the investment community to have a dialogue around what constitutes a good investment.  
              <span style={{fontStyle: 'italic'}}>  'Market Reactions'</span> enables the generation of ideas and continual feedback via comments.  
              Additionally, future functionality will look to expand the power of sharing ideas as nominal continues to evolve.
            </p>
          </div>
        </section>

        <h1 className="about-header">Own Your Portfolio</h1>
        <section className="team-container">
          <div>
            <p>
              Nominal is currently a personal project that aims to expand upon investment knowledge, developer experience, and user experience. 
              All data provided on nominal is provided for informational purposes only, and is not intended for trading or investing purposes.
            </p>
          </div>
        </section>



        
      </section>

        
        
    </section>
    
  )
}

export default About;