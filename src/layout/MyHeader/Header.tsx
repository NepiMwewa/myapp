import { SiteManager } from '../../siteManager';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//https://www.youtube.com/watch?v=TNhaISOUy6Q

export function Header({title}: {title?: string;}){
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky='top'>
      <Container>
        
        <Navbar.Brand>
          <img className='img-logo' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="logo"/>
          {title || SiteManager.getTitle()}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto center">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dungeons-of-oregoa">
              <Nav.Link>Dungeons of Oregoa</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
        