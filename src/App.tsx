import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { parse, ParseResult } from 'papaparse';
import { monthParser, Months, CsvObject } from './parser';
import { Calculator } from './analyzers/Calculator';

interface AppState {
  filename: string;
  data?: CsvObject[];
  months?: Months;
}

interface AppProps {
  stats?: [];
}

const calc = new Calculator();

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

                          console.log('this.state');
                          console.log(this.state);

                          if (this.state.data !== undefined) {
                            const newobj = calc.specificDate(
                              this.state.data,
                              'MaxTemp(°C)'
                            );
                            console.log(
                              `The ${newobj.parameter} was ${newobj.value} on ${newobj.date}`
                            );
                          }

                          if (this.state.months !== undefined) {
                            const monthlyMaxes = calc.dataEachMonth(
                              Object.values(this.state.months),
                              'MaxTemp(°C)'
                            );
                            console.log(
                              'Array from everyMonth (max temp for each month): \n'
                            );
                            console.log(monthlyMaxes);

                            console.log('Max temp of all months: \n');
                            console.log(Math.max(...monthlyMaxes));
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
        {this.state.months ? this.warmestHigh() : null}
      </Container>
    );
  }
}
