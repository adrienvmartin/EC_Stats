import React from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

export class App extends React.Component {
  render() {
    return (
      <Container>

{/* HEADER SECTION */}
{/******************/}
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={8}><h1>Environment Canada CSV File Parser</h1></Col>
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
                </Form.Group>
                </Form>
                </Card.Body>
            </Card>
          </Col>
            <Col></Col>
        </Row>
        <br />

{/* MONTH SELECTION */}
{/*******************/}
        <Card>
          <Card.Body>
            <Card.Title>Select Months</Card.Title>
        <Row className="justify-content-md-center">
          <Col sm={2}>
                <Form.Check label={"Select All"} />
          </Col>
          <Col sm={2}>
               <Form.Check label={"Select None"} />
          </Col>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col md={3}>
            <Form>
              <Form.Group>
                <Form.Check type="checkbox" label={"January"} />
                <Form.Check type="checkbox" label={"February"} />
                <Form.Check type="checkbox" label={"March"} />
                <Form.Check type="checkbox" label={"April"} />
              </Form.Group>
              </Form>
            </Col>
          <Col md={3}>
            <Form>
              <Form.Group>
              <Form.Check label={"May"} />
              <Form.Check label={"June"} />
              <Form.Check label={"July"} />
              <Form.Check label={"August"} />
              </Form.Group>
              </Form>
            </Col>
          <Col md={3}>
            <Form>
              <Form.Group>
              <Form.Check label={"September"} />
              <Form.Check label={"October"} />
              <Form.Check label={"November"} />
              <Form.Check label={"December"} />
              </Form.Group>
              </Form>
            </Col>
            </Row>
            </Card.Body>
        </Card>
        <br />

{/* DATA SELECTION */}
{/*******************/}
        <Card>
          <Card.Body>
            <Card.Title>Select Data Points</Card.Title>
        <Row className="justify-content-md-center">
          <Col md={3}></Col>
              <Col md={3}>
                <Form>
                  <Form.Group>
                    <Form.Check label="Warmest high" />
                    <Form.Check label="Coldest high" />
                    <Form.Check label="Wettest day" />
                  </Form.Group>

                </Form>
              </Col>
              <Col md={3}></Col>
            </Row>
            </Card.Body>
          </Card>
        
          </Container>
    )
  }
};
