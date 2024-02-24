import PageContainer from "../containers/PageContainer";
import { NavLink } from "react-router-dom";

import "./About.css";
import { Container } from "react-bootstrap";

function About () {
  return (
    <PageContainer title="About">
      <div 
        className="top-banner"
        alt="Banner Image">
      </div>
      <section>
        <Container>
          <div className="test">This is the About Page</div>
        </Container>
      </section>
    </PageContainer>
  )
}

export default About;