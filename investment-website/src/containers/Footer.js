import React from "react";
import LinkedInLogo from '../images/LinkedIn.png'
import GitHubLogo from '../images/GitHub.png'
import GmailLogo from '../images/Gmail.png'

function Footer(props) {
  return (
    <footer>
      <div>
      </div>
      <div className="footer-icon" >
        <a href="https://www.linkedin.com/in/joshlutz/" target="_blank" rel="noopener noreferrer">
          <img id="linkedin-icon" src={LinkedInLogo} alt="LinkedIn Icon"/>
        </a>
        <a href="https://github.com/lutz143" target="_blank" rel="noopener noreferrer">
          <img id="github-icon" src={GitHubLogo} alt="GitHub Icon"/>
        </a>
        <a href="mailto:lutz2k7@gmail.com?subject=eFolio&body=Let's Connect!">
          <img id="gmail-icon" src={GmailLogo} alt="Email Icon"/>
        </a>
      </div>
      <div>
      </div>
    </footer>
  );
}
  
export default Footer;