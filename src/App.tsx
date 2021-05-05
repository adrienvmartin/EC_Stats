import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse, ParseResult } from 'papaparse';
import { CsvObject } from './parser';

interface AppProps {
  data: CsvObject[];
}

interface AppState {
  data?: CsvObject[];
}

export class App extends React.Component<AppProps, AppState> {
  renderStats() {}

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
                <form>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();

                      Array.from(e.dataTransfer.files)
                        .filter((file) => file.type === 'text/csv')
                        .forEach(async (file) => {
                          const text = await file.text();
                          const result: ParseResult<CsvObject> = parse(text, {
                            header: true,
                            skipEmptyLines: false,
                            transformHeader: (h) => {
                              let regex = /\s/g;
                              return h.replace(regex, '');
                            },
                            complete: (results) => {
                              console.log('Parsing complete: \n', results);
                            },
                          });
                          this.setState({ data: result.data });
                          console.log('this.state: \n', this.state.data);
                        });
                    }}
                  >
                    DROP HERE
                  </div>
                </form>
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
