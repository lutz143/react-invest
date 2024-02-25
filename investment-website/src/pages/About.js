import { NavLink } from "react-router-dom";
import ProfilePic from '../images/JoshLutz289635.jpg'

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
          Every day we open our doors and welcome millions of hungry people. 
          But they’re not just hungry for food. 
          They’re hungry for something that can make their lives healthier, easier, brighter and a bit lighter. 
          They’re hungry to feel good, do well, to go from anxiety to inspiration.
        </p>
        <p>
          So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
          Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
          We’ve always been about value, convenience, and making customers’ lives simpler.
        </p>
        <p>
          So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
          Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
          We’ve always been about value, convenience, and making customers’ lives simpler.
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
              So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
              Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
              We’ve always been about value, convenience, and making customers’ lives simpler.
            </p>
            <p>
              So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
              Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
              We’ve always been about value, convenience, and making customers’ lives simpler.
            </p>
          </div>
        </section>

        <h1 className="about-header">Why It Matters</h1>
        <section className="team-container">
          <div>
            <p>
              So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
              Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
              We’ve always been about value, convenience, and making customers’ lives simpler.
            </p>
            <p>
              So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
              Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
              We’ve always been about value, convenience, and making customers’ lives simpler.
            </p>
          </div>
        </section>

        <h1 className="about-header">Own Your Portfolio</h1>
        <section className="team-container">
          <div>
            <p>
              So whether we manufacture, market, stock, check, deliver, or manage, we all try to make their experience as uplifting as possible. 
              Just like Barney Kroger did when he brought together the butcher, the baker, dry goods, and produce all under one roof. 
              We’ve always been about value, convenience, and making customers’ lives simpler.
            </p>
          </div>
        </section>



        
      </section>

        
        
    </section>
    
  )
}

export default About;