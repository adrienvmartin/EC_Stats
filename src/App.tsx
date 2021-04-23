import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export class App extends React.Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={8}><h1>Environment Canada CSV File Parser</h1></Col>
          <Col></Col>
          </Row>
        <br />

{/* CSV SELECTION */}
{/*******************/}
        <Row>
          <Col></Col>
          <Col><Form>
            <Form.Group>
             <Form.File id="csvinput" label="Select CSV File Here" />
            </Form.Group>
          </Form>
          </Col>
          <Col></Col>
        </Row>
        <br />

{/* MONTH SELECTION */}
{/*******************/}
        <Row className="justify-content-md-center">
          <Col sm={2}>
                <Form.Check label={"Select All Months"} />
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
                <Form.Check label={"January"} />
                <Form.Check label={"February"} />
                <Form.Check label={"March"} />
                <Form.Check label={"April"} />
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

{/* DATA SELECTION */}
{/*******************/}
        <Row className="justify-content-md-center">
          <Col></Col>

       </Row>
        
      </Container>
    )
  }
};
