import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

export class App extends React.Component {
  render() {
    return (
      <Container>
        {/* HEADER SECTION */}
        {/******************/}
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={8}>
            <h1>Environment Canada CSV File Parser</h1>
          </Col>
          <Col></Col>
        </Row>
        <br />

        {/* CSV SELECTION */}
        {/*******************/}
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.File id="csvinput" label="Select CSV File Here" />
                    <br />
                    <Button>Generate</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <br />
      </Container>
    );
  }
}
