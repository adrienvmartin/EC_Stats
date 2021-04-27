import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { CsvReader } from './CsvReader';

export class App extends React.Component {
  private onSubmit(e: React.FormEvent<HTMLInputElement>, filename: string) {
    e.preventDefault();
    console.log('Submitted!');
    return new CsvReader(filename);
  }

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
                  <Form.Group controlId="CsvSelector">
                    <Form.File id="csvinput" label="Select CSV File Here" />
                    <br />
                    <Button type="submit">Generate</Button>
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
