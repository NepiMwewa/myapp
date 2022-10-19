import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const NoPage = () => {
  return(
    <Container>
      
      <Card>
      <Card.Header as="h1">404: Page not found</Card.Header>
      <Card.Body>
        <Card.Title>404: Page not found</Card.Title>
        <Card.Text>
          We are sorry, the page you are trying to access is not available. Perhaps the following places will be better for you.
        </Card.Text>
        <Row xs="auto">
          <Col>
            <LinkContainer to="/">
              <Button variant="dark">Home</Button>
            </LinkContainer>
          </Col>
          <Col>
            <LinkContainer to="/blog">
              <Button variant="dark">Blog</Button>
            </LinkContainer>
          </Col>
          <Col>
            <LinkContainer to="/dungeons-of-oregoa">
              <Button variant="dark">Dungeons of Oregoa</Button>
            </LinkContainer>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
         
      
    </Container>
  );
};

export default NoPage;