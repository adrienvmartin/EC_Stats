import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export const DataSelector = () => {
  return (
    <Container>
      {/* MONTH SELECTION */}
      {/*******************/}
      <Card>
        <Card.Body>
          <Card.Title>Select Months</Card.Title>
          <Row className="justify-content-md-center">
            <Col sm={2}>
              <Form.Check label={'Select All'} />
            </Col>
            <Col sm={2}>
              <Form.Check label={'Select None'} />
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md={3}>
              <Form>
                <Form.Group>
                  <Form.Check type="checkbox" label={'January'} />
                  <Form.Check type="checkbox" label={'February'} />
                  <Form.Check type="checkbox" label={'March'} />
                  <Form.Check type="checkbox" label={'April'} />
                </Form.Group>
              </Form>
            </Col>
            <Col md={3}>
              <Form>
                <Form.Group>
                  <Form.Check label={'May'} />
                  <Form.Check label={'June'} />
                  <Form.Check label={'July'} />
                  <Form.Check label={'August'} />
                </Form.Group>
              </Form>
            </Col>
            <Col md={3}>
              <Form>
                <Form.Group>
                  <Form.Check label={'September'} />
                  <Form.Check label={'October'} />
                  <Form.Check label={'November'} />
                  <Form.Check label={'December'} />
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
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Averages & Extremes</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Check label="Average high" />
                      <Form.Check label="Average low" />
                      <Form.Check label="Mean Temperature" />
                      <Form.Check label="Record High" />
                      <Form.Check label="Record Low" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Warmest & Coldest</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Check label="Warmest high" />
                      <Form.Check label="Coldest high" />
                      <Form.Check label="Warmest low" />
                      <Form.Check label="Coldest low" />
                      <Form.Check label="Warmest mean" />
                      <Form.Check label="Coldest mean" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Precipitation</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Check label="Precipitation Days" />
                      <Form.Check label="Total precipitation" />
                      <Form.Check label="Wettest day" />
                      <Form.Check label="Average rain day" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Random</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Check label="Warmest day of the week" />
                      <Form.Check label="# of days above average" />
                      <Form.Check label="# of days below average" />
                      <Form.Check label="Coldest low" />
                      <Form.Check label="Warmest mean" />
                      <Form.Check label="Coldest mean" />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
      <br />
      <Button>Generate Report</Button>
      <br />
      <br />
    </Container>
  );
};
