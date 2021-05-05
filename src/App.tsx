import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse, ParseResult } from 'papaparse';
import { monthParser, Months, CsvObject } from './parser';
import { Calculator } from './analyzers/Calculator';
import { AnalyzedData } from './data';

interface AppState {
  year?: CsvObject[];
  months?: Months;
  data?: AnalyzedData;
}

interface AppProps {
  stats?: [];
}

const calc = new Calculator();

export class App extends React.Component<AppProps, AppState> {
  warmestHigh = () => {
    let maxhigh;
    let maxindex;
    let indexMonth;
    if (this.state.months) {
      const data = calc.dataEachMonth(
        Object.values(this.state.months),
        'MaxTemp(°C)'
      );
      maxhigh = Math.max(...data);
      maxindex = data.indexOf(Math.max(...data));
      if (maxindex === 7) {
        indexMonth = 'August';
      }
    }

    return `The warmest high of the year is: ${maxhigh}, in the month of ${indexMonth}`;
  };

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
                              let re = /\s([(*)])/g;
                              return h.replace(re, '');
                            },
                            complete: (results) => {
                              console.log('Parsing complete: ', results);
                            },
                          });
                          const months: Months = monthParser(result.data);
                          this.setState({
                            year: result.data,
                            months,
                          });
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
