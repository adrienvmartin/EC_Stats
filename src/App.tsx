import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

export class App extends React.Component {
  private onSubmit(filename: string) {
    console.log(`Submitted: ${filename}`);
    // return new CsvReader(filename);
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
                    <Button
                      type="submit"
                      onClick={() => this.onSubmit('.csvinput')}
                    >
                      Generate
                    </Button>
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
