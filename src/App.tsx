import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}><h1>Environment Canada CSV File Parser</h1></Col>
          <Col></Col>
          </Row>
        <br />
        <Row>
          <Col></Col>
          <Col xs={8}><Form>
            <Form.Group>
             <Form.File id="csvinput" label="Select CSV File Here" />
          </Form.Group>
          </Form></Col>
          <Col></Col>
          </Row>
      </Container>
    )
  }
};
