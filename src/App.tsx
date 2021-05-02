import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse, ParseResult } from 'papaparse';
import { monthParser, Months, CsvObject } from './parser';
import { warmestHigh } from './analyzers/StatsAnalyzer';

interface AppState {
  filename: string;
  data?: CsvObject[];
  months?: Months;
}

interface AppProps {
  stats?: [];
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { filename: '' };
  }

  private onSubmit(filename: string) {
    console.log(`Submitted: ${filename}`);
    // return new CsvReader(filename);
  }

  onHandleClick = (filename: string): void => {
    this.setState({ filename: filename });
    console.log(this.state.filename);
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
                            skipEmptyLines: true,
                            transformHeader: (h) => {
                              return h.replace(/\s/g, '');
                            },
                          });
                          const months: Months = monthParser(result.data);
                          this.setState({
                            data: result.data,
                            months,
                          });

                          console.log('Month Parser: \n');
                          console.log(monthParser(result.data));
                          console.log('\n result.data: \n');
                          console.log(result.data);
                          console.log('\n this.state: \n');
                          console.log(this.state);

                          if (this.state.months !== undefined) {
                            console.log('\n Warmest high: \n');
                            console.log(
                              warmestHigh(this.state.months.Apr, [
                                'MinTemp(°C)',
                              ])
                            );
                          }
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
        {this.state.months
          ? this.state.months.Jan.map((m) => (
              <div key={Math.random()}>{Object.values(m)}</div>
            ))
          : null}
      </Container>
    );
  }
}
