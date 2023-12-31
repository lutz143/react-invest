import { Tabs, Tab } from 'react-bootstrap';

function StockTab(props) {
  <Tabs
  defaultActiveKey="profile"
  id="uncontrolled-tab-example"
  className="mb-3"
  >
    <Tab eventKey="home" title="Home">
      {props.children}
    </Tab>
    <Tab eventKey="profile" title="Profile">
      Tab content for Profile
    </Tab>
    <Tab eventKey="contact" title="Contact" disabled>
      Tab content for Contact
    </Tab>
  </Tabs>
}

export default StockTab;