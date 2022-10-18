import { Container } from "react-bootstrap";
import { MyCounter } from "../components/MyCounter/myCounter";

export function  Contact ({title}: {title?: string;}){
  return (
    <Container className="App container-fluid">
      <h2>Contact me</h2>
    </Container>
  );
}